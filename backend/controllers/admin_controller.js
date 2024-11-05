import { AdminModel, UpdateAdminModel } from "../models/admin_model.js";
import * as bcrypt from "bcrypt";
import { permissions } from "../Utils/rbac.js";
import {adminSchema, updateAdminSchema} from "../schema/admin_schema.js";
import jwt from "jsonwebtoken";


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("body-->", req.body);

    // Find the admin by email
    const admin = await AdminModel.findOne({ email: email });
    if (!admin) {
      return res.status(401).json('Invalid email or password');
    }

    // Compare password
    const correctPassword = bcrypt.compareSync(password, admin.password);
    if (!correctPassword) {
      return res.status(401).json('Invalid email or password');
    }

    // Save admin ID in the session
    req.session.admin = { id: admin._id };
    console.log('admin', req.session.admin);

    // Generate JWT token with admin's ID and role
    const accessToken = jwt.sign(
      { id: admin._id, isAdmin: admin.role === "admin" }, // Payload with admin ID and role
      process.env.JWT_PRIVATE_KEY, // Secret key from your .env file
      { expiresIn: "1h" } // Token expiration
    );

    const refreshToken = jwt.sign(
      { id: admin._id },
      process.env.REFRESH_TOKEN_SECRET, // Ensure this is set in your .env file
      { expiresIn: "7d" }
    );

    // Send response with tokens
    res.status(200).json({
      message: 'Login Successfully',
      token: accessToken,
      refreshToken: refreshToken,
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }
    });
  } catch (error) {
    next(error);
  }
};




// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body
//     console.log("body-->", req.body)

//     const admin = await AdminModel.findOne({ email: email });

//     if (!admin) {
//       res.status(401).json('Invalid email or password');
//     } else {
//       const correctPassword = bcrypt.compareSync(password, admin.password);
//       if (!correctPassword) {
//         res.status(401).json('Invalid email or password');
//       } else {
//         req.session.admin = { id: admin.id };
//         console.log('admin', req.session.admin);
//         res.status(200).json('Login Successfully');
//       }
//     }

//     const hashedPassword = bcrypt.hashSync(value.password, 8);

//     await AdminModel.create({
//       ...value,
//       password: hashedPassword
//     });


//   } catch (error) {
//     next(error);

//   }
// };


export const signUp = async (req, res, next) => {
  try {
    const { error, value } = adminSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //   Checking if admin is already in database
    const email = value.email;

    const findIfAdminExist = await AdminModel.findOne({ email });
    if (findIfAdminExist) {
      return res.status(401).send("Admin is already registered");
    } else {
      const hashedPassword = bcrypt.hashSync(value.password, 12);
      value.password = hashedPassword;

      const addAmin = await AdminModel.create(value);
      return res.status(201).send("Admin registered successfully"); 
  
    }
  } catch (error) {
    next(error);
  }
};


export const createAdmin = async (req, res, next) => {
  try {
    const { error, value } = adminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingAdmin = await AdminModel.findOne({ email: value.email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin with this email is already registered." });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 12);

    const defaultPermissions = permissions.find((p) => p.role === (value.role || 'admin'))?.actions || [];

    const newAdminData = {
      ...value,
      password: hashedPassword,
      role: value.role || 'admin',
      permissions: defaultPermissions,
    };

    const newAdmin = new AdminModel(newAdminData);
    await newAdmin.save();

    return res.status(201).json({ message: "New admin added successfully." });
  } catch (error) {
    next(error);
  }
};


export const updateAdmin = async (req, res) => {
    try {
        const { error, value } =
            updateAdminSchema.validate({
                ...req.body
            });
        if (error) {
            return res.status(422).json(error);
        }
        const updateAdmin = await UpdateAdminModel.findOneAndUpdate(
            {
                _id: req.params.id,
                admin: req.auth.id
            },
            value,
            { new: true }
        );
        if (!updateAdmin) {
            res.status(404).json.send({
                message: "Admin not found",
            });
        }
        res.status(200).json({
            message: "Admin details updated successfully.",
            admin : updateAdmin,
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to update admin details." });
    }
};


export const logout = async (req, res) => {
  try {
    // Check if session exists
    if (!req.session) {
      return res.sendStatus(404); // Not Found if session does not exist
    }
    req.session.destroy();

    res.status(200).json({ message: "You have been logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "Logout failed. Please try again." });
  }
};


export const listAdminUsers = async (req, res, next) => {
  try {
    // 1. Check for an authorization token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "You do not have permission to view this information." });
    }

    // 2. Verify the token and check if the user is an admin
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (!decoded || !decoded.isAdmin) {
      return res.status(403).json({ message: "You do not have permission to view this information." });
    }

    // 3. Retrieve all active admin users from the database
    const admins = await AdminModel.find({ isActive: true });

    // 4. Map through the admin list and select required fields to return
    res.status(200).json(
      admins.map((admin) => ({
        name: `${admin.firstName} ${admin.lastName}`,
        email: admin.email,
        phone: admin.phoneNumber,
        permissions: admin.permissions,
        status: admin.isActive ? "Active" : "Inactive",
      }))
    );
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).json({ message: "An error occurred while retrieving admin users." });
    next(error);
  }
};


// export const listAdminUsers = async (req, res, next) => {
//     try {
//       // Check if token exists
//       const token = req.headers.authorization?.split(" ")[1];
//       if (!token) {
//         return res.status(403).json({ message: "You do not have permission to view this information." });
//       }
  
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       if (!decoded || !decoded.isAdmin) {
//         return res.status(403).json({ message: "You do not have permission to view this information." });
//       }
  
//       // Fetch all active admin users
//       const admins = await AdminModel.find({ isActive: true });
//       res.status(200).json(
//         admins.map((admin) => ({
//           name: admin.name,
//           email: admin.email,
//           phone: admin.phone,
//           permissions: admin.permissions,
//           status: admin.status,
//         }))
//       );
//     } catch (error) {
//       // Log error to understand issue
//       console.error("Error fetching admin users:", error);
//       next(error); // Pass error to middleware for handling
//     }
//   };
  
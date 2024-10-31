
import { AdminModel } from "../models/admin_model.js";

import bcrypt from "bcrypt";
import { adminSchema } from "../schema/admin_schema.js";

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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      res.status(401).json('Invalid email or password');
    } else {
      const correctPassword = bcrypt.compareSync(password, user.password);
      if (!correctPassword) {
        res.status(401).json('Invalid email or password');
      } else {
        req.session.admin = { id: admin.id };
        console.log('admin', req.session.admin);
        res.status(200).json('Login Successfully');
      }
    }

    const hashedPassword = bcrypt.hashSync(value.password, 8);

    await AdminModel.create({
      ...value,
      password: hashedPassword
    });


  } catch (error) {
    next(error);

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

import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { mailTransporter } from "../Utils/mail.js";

export const signUp = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
   
    

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //   Checking if user is already in database
    const email = value.email;

    const findIfUserExist = await UserModel.findOne({ email });
    if (findIfUserExist) {
      return res.status(401).send("User is already registered");
    } else {
      const hashedPassword = bcrypt.hashSync(value.password, 12);
      value.password = hashedPassword;
      const addUser = await UserModel.create(value);
    
      

      //send verification email
      await mailTransporter.sendMail({
        to:value.email,
        subject: "Email verified successfully",
        text: `Hello verify your email by clicking on http://localhost:3500/api/auth/verify-email`,
      })
      
      return res.status(201).send("User registered successfully");
    }
  } catch (error) {
    next(error);
  }
};


//code for login and token
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Find a user using their unique identifier
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(401).json("Invalid email or password");
    } else {
      //Verify their password
      const correctPassword = bcrypt.compareSync(password, user.password);
      if (!correctPassword) {
        res.status(401).json("Invalid email or password");
      } else {
        //Generate a session
        req.session.user = { id: user.id };
        console.log("user", req.session.user);
        // Return response
        res.status(200).json("Login successful");
      }
    }
  } catch (error) {
    next(error);
  }
};

export const token = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Find a user using their unique identifier
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(401).json("Invalid email or password");
    } else {
      //Verify their password
      const correctPassword = bcrypt.compareSync(password, user.password);
      if (!correctPassword) {
        res.status(401).json("Invalid email or password");
      } else {
        //Generate a token
        const accessToken = jwt.sign(
          { id: user._id },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = jwt.sign(
          { id: user._id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" }
        );

        res.json({
          token: accessToken,
          refreshToken: refreshToken,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Check if session exists
    if (!req.session) {
      return res.sendStatus(404); // Not Found if session does not exist
    }
    req.session.destroy();

    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is required!" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.json({
      token: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};





   export const verifyEmail =  async (req, res, next) => {

    try {
  // Get the token from the query parameter
  const  token  = req.query.token;

  if (!token) {
      return res.status(400).json({ message: 'Verification token is missing.' });
  }

  // Verify the token
  const decoded = jwt.verify(token, 'your_secret_key'); 

  //Find the user associated with the token
  const user = await User.findOne({ where: { id: decoded.userId } });

  if (!user) {
      return res.status(404).json({ message: 'User not found.' });
  }

  // Check if the user is already verified
  if (user.verified) {
      return res.status(400).json({ message: 'Account already verified.' });
  }

  // Update the user's verification status
  user.verified = true;
  await user.save();

  // Send a success response
  res.status(200).json({ message: 'Email verified successfully!' });

} catch (error) {
  next(error)
  // Handle errors
  if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Verification token expired.' });
      
  }
  res.status(500).json({ message: 'Server error.' });
}
};
  
        
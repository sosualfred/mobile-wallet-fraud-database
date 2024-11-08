import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

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
      { expiresIn: "1h" } // or whatever expiration time you prefer
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

<


// Access environment variables directly via process.env
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI, REDIRECT_URIS, JWT_SECRET } = process.env;

// Initiates Google OAuth by redirecting the user to Google's OAuth page
export const initiateGoogleOAuth = (req, res) => {
  const oauthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=email%20profile&state=secure_random_state_string`;
  res.redirect(oauthURL);
};

// Handles Google OAuth callback, verifies token, and creates/updates user
export const handleGoogleCallback = async (req, res) => {
  const { code, state } = req.body;

  // Verify state parameter for CSRF protection
  if (state !== 'secure_random_state_string') {
    return res.status(400).json({ message: "Invalid state parameter" });
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      redirect_uris: REDIRECT_URIS,
      grant_type: 'authorization_code'
    });

    const { access_token, id_token } = tokenResponse.data;

    // Use access token to get user info from Google
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const { email, name } = userInfoResponse.data;

    // Generate JWT token for user session
    const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '1h' });

    // Mock user creation or update (replace with DB logic)
    const user = { email, name };

    res.status(200).json({
      message: "Admin details updated successfully.",
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Google authentication failed", error: error.message });
  }
};

export const deactivateUserAccount = async (req, res, next) => {
  try {
    // Find the user by their ID from the authentication token
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check if the account is already deactivated
    if (!user.isActive) {
      return res.status(400).json({ message: "Account is already deactivated" });
    }

    // Deactivate the account
    user.isActive = false;
    await user.save();

    res.status(200).json({ message: "Account successfully deactivated" });
  } catch (error) {
    next(error);
  }
};


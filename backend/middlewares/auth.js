import jwt from "jsonwebtoken";
import { ApiKeyModel } from "../models/api_model.js";
import { AdminModel } from "../models/admin_model.js";
import { permissions } from "../Utils/rbac.js";

// export const isAuthenticated = (req, res, next) => {
//Check if session has user
// if (req.session.user) {
//   next();
// } else if (req.headers.authorization) {
//   try {
//Extract token from headers
// const token = req.headers.authorization.split(" ")[1];
//Verify the token to get user and append to request
// req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//  console.log('Session User:', req.session.user);
//  console.log('JWT User:', req.user);
//all next function
//       next();
//     } catch (error) {
//       return res.status(401).json({ error: "Token Expired" });
//     }
//   } else {
//     res.status(401).json("User not authenticated");
//   }
// };


export const isAuthenticated = (req, res, next) => {
  console.log("session", req.session)
  req.user = req.session.user || req.session.admin
  // Check if session contains user
  if (req.user) {
    // req.user = req.session.user;  // Set req.user from session data
    next();
  } else if (req.headers.authorization) {
    try {
      // Extract token from headers
      const token = req.headers.authorization.split(" ")[1];
      // Verify the token and attach user data to req.user
      req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      next();
    } catch (error) {
      return res.status(401).json({ error: "Token Expired" });
    }
  } else {
    res.status(401).json("User not authenticated");
  }
};

// To make sure that the API key is valid and allowed for the domain

export const validateDomain = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).send("API key is missing");
  }

  try {
    const apiKeyDoc = await ApiKeyModel.findOne({ apiKey });
    if (!apiKeyDoc) {
      return res.status(401).send("Invalid API key");
    }

    const requestOrigin = req.get("origin") || req.hostname; // Check the request origin or hostname

    if (
      apiKeyDoc.domain.length > 0 &&
      !apiKeyDoc.domain.includes(requestOrigin)
    ) {
      return res.status(403).send("API key not allowed for this domain");
    }

    next(); // Proceed if the domain is valid
  } catch (error) {
    next(error);
  }
};



// export const hasPermission =  (action) =>{
//   return async (req, res, next)=>{
//     try {
//       const admin = await AdminModel.findById(req.auth.id);
//       const permission = permissions.find(value => value.role === admin);
//       if(!permission){
//         return res.status(403).json("No permission found!")
//       }

//       if (permission.actions.includes(action)){
//         next();
//       } else{
//         res.status(403).json("Action not allowed!")
//       }

//     } catch (error) {
//       next(error)
//     }
//   }
// };


export const hasPermission = (action) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User ID not found or authentication required' });
      }

      const user = await AdminModel.findById(req.user.id);  // Use `req.user.id` from `isAuthenticated`

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const rolePermissions = permissions.find((p) => p.role === user.role)?.actions || [];

      if (rolePermissions.includes(action)) {
        next();
      } else {
        res.status(403).json({ message: 'Action not allowed' });
      }
    } catch (error) {
      next(error);
    }
  };
};



// export const hasPermission = (action) => {
//   return async (req, res, next) => {
//     try {
//       const user = await AdminModel.findById(req.auth.id);

//       if (!user) {
//         return res.status(404).json('User not found');
//       }

//       const rolePermissions = permissions.find((p) => p.role === user.role)?.actions || [];

//       if (rolePermissions.includes(action)) {
//         next();
//       } else {
//         res.status(403).json('Action not allowed');
//       }
//     } catch (error) {
//       next(error);
//     }
//   };
// };

//importing modules
import express from "express";

//search the database to see if user exist
const saveUser = async(req,res,next)=>{
  try{
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
//if username exist in the database respond with a status of 409
if (username){
  return res.json(409).send("username already taken");
}
//checking if email already exist
const emailcheck = await User.findOne({
  where: {
    email: req.body.email,
  },
});
//if email exist in database respond with a status of 409
if (emailcheck) {
  return res.json(409).send("Authentication failed");
}

  next();
} catch(error){
  console.log(error)
}
}
//exporting module


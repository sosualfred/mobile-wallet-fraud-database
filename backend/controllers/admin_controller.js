
import { AdminModel } from "../models/admin_model.js";
import bcrypt from "bcryptjs";

export const login = async(req,res,next)=>{
    try {
        const {email,password}= req.body

        const admin = await AdminModel.findOne({email:email});

        if(!admin){
            res.status(401).json('Invalid email or password');
        }else {
            const correctPassword = bcrypt.compareSync(password,user.password);
            if(!correctPassword){
                res.status(401).json('Invalid email or password');
            }else{
                req.session.admin = {id:admin.id};
                console.log('admin',req.session.admin);
                res.status(200).json('Login Successfully');
            }
        }

        const hashedPassword = bcrypt.hashSync(value.password,8);

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

    } catch (error) {res.status(500).json({ message: "Logout failed. Please try again." });
    }
  };

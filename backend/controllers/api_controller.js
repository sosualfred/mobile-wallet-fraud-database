import { ApiKeyModel } from "../models/api_model.js";
import { UserModel } from "../models/user_model.js";
import { apiKeySchema } from "../schema/api_schema.js";
import { generateKey } from "../Utils/api_key_generator.js";
import bcrypt from "bcrypt";

export const generateApiKey = async (req, res, next) => {
  try {
    const { error, value } = apiKeySchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (value.domain) {
      const existingKey = await ApiKeyModel.findOne({
        user: id,
        domain: value.domain,
      });
      if (existingKey) {
        return res
          .status(400)
          .send("Domain is already associated with another API key.");
      }
    }

    const apiKey = generateKey();

    const hashedApiKey = bcrypt.hashSync(apiKey, 12);

    try {
      const newApiKey = await ApiKeyModel.create({
        ...value,
        user: id,
        apiKey: hashedApiKey,
        domain: value.domain || [],
      });

      user.apiKey.push(newApiKey._id);

      await user.save();

      res.status(201).json({
        message: "API Key generated successfully",
        // key: apiKey,
      });
    } catch (dbError) {
      if (dbError.code === 11000) {
        // MongoDB duplicate key error code
        return res
          .status(400)
          .send("Domain is already associated with another API key.");
      }
      throw dbError;
    }
  } catch (error) {
    next(error);
  }
};



export const getApiKeys = async (req, res, next)=>{
  try {
    const id = req.session?.user?.id || req?.user?.id;

        const user = await UserModel.findById(id);
        if (!user) {
          return res.status(404).send("User not found");
        }
    const allApiKeys = await ApiKeyModel.find({user:id})
    if(!allApiKeys){
      return res.status(404).json({ message: "You do not have any API keys or do not have permission to view them." });
    }
    res.status(200).json({ message: "success", apiKey: allApiKeys });
  } catch (error) {
    next(error)
  }
  
export const deleteApi = async(req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    console.log("User ID:", id);
    console.log("API Key ID:", req.params.id);
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const apiKey = await ApiKeyModel.findOne({_id: req.params.id ,user: id});
    console.log("API Key Found:", apiKey);

    if(!apiKey){
      return res.status(404).send("You Do Not Have Permission To Delete This API Key or It Does Not Exist.");
    }
    // DELETE THE API KEY
    await ApiKeyModel.findByIdAndDelete(req.params.id);

    user.apiKey.pull(req.params.id);
    await user.save();

    res.status(200).json({message: 'API Key Deleted Successfully'});
  } catch (error) {
    next(error)
  }
}


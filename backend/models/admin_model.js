
import{model,Schema, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';


const adminSchema = new Schema(
    {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, lowercase: true, unique: true },
      phoneNumber: { type: String, unique: true },
      password: { type: String },
      resetToken: { type: String },
      resetTokenExpiresAt: { type: Date },
      fraudReport: [{ type: Types.ObjectId, ref: "FraudReport" }],
      apiKey: [{ type: Types.ObjectId, ref: "ApiKey" }],
      role: { type: String, default: 'user', enum: ['user', 'admin'] },
    },
    {
      timestamps: true,
    }
  );


// const adminSchema = new Schema({
//     email:{type: String, lowercase: true, unique:true},
//     password:{type: String}
// },
// {
//     timestamps: true,
// });

adminSchema.plugin(toJSON);

export const AdminModel = model('Admin',adminSchema);
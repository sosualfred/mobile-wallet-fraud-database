import { model, Schema } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const adminSchema = new Schema({
    email: { type: String, lowercase: true, unique: true },
    password: { type: String }
},
    {
        timestamps: true,
    });

adminSchema.plugin(toJSON);

export const AdminModel = model('Admin', adminSchema);


const updateAdminScheme = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
}, {
    timestamps: true,
})


updateAdminScheme.plugin(toJSON);

export const UpdateAdminModel = model("UpdateAdmin", updateAdminScheme)
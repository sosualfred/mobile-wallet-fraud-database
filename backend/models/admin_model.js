
import{model,Schema} from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const adminSchema = new Schema({
    email:{type: String, lowercase: true, unique:true},
    password:{type: String}
},
{
    timestamps: true,
});

adminSchema.plugin(toJSON);
export const AdminModel = model('Admin',adminSchema);
import Joi from "joi";

export const adminSchema = Joi.object({
    email: Joi.string().lowercase().email().required(),

    password: Joi.string()
    .min(8)
    .pattern(/[0-9]/)
    .message(
        'Password must be at least 8 characters long and include at least one number'
    )
    .required(),
});


export const updateAdminValidator =Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
    .min(8)
    .pattern(/[0-9]/)
    .message(
        'Password must be at least 8 characters long and include at least one number'
    ),

})


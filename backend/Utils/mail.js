
import { createTransport} from "nodemailer";

console.log(process.env.EMAIL_USER)
export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    from: "calvinbekoe7@gmail.com"
});
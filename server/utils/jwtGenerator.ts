import jwt, {Secret} from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path:"../.env"})

function jwtGenerator(user_id: string) {
    const payload = {
        user: {
            id: user_id
        }
    };
    const secret_key: Secret = process.env.jwtSecret!;
    return jwt.sign(payload, secret_key, {expiresIn: "7d"});
};

export default jwtGenerator;
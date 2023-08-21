import jwt, {Secret} from "jsonwebtoken";
import {Request, Response} from "express";
import dotenv from 'dotenv';
dotenv.config()

export default async (req: Request, res: Response, next: any) => {
    console.log("authorization middleware");
    try {
        // grab token from request header
        const jwtToken = req.header("token");

        // check if there is no token given
        if (!jwtToken) {
            return res.status(403).json("Not Authorized");
        }

        // use jwt to verify the token with the secret key
        const secret_key: Secret = process.env.jwtSecret!;
        const payload = jwt.verify(jwtToken, secret_key) as {user: {id: string}};
        // console.log("user payload:");
        // console.log(payload);
        // console.log(payload.user);
        // console.log(req);
        req.user = payload.user;
        // console.log(req.user);
        next();
    } catch (error: any) {
        // console.log("Auth Error:");
        console.error(error.message);
        return res.status(403).json("Authoization: Not Authorized")
    }
    console.log("authorization: end of function");  
}
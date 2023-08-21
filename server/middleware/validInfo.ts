import {Request, Response} from "express";
import Filter from "bad-words";
const filter = new Filter();

export default (req: Request, res: Response, next: any): Response | void =>  {
    console.log("validate info middleware");
    const { name, email, password } = req.body;

    function validEmail(userEmail: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        if (![email, name, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (filter.isProfane(name) || filter.isProfane(email)) {
            return res.status(401).json("User Name or Email Contain Illegal Words");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email Address");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email Address");
        }
    }

    next();
};
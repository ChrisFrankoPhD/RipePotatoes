import express, {Express, Request, Response} from "express";
import loginReg from "./routes/loginReg.js";
import dashboard from "./routes/dashboard.js";
const app: Express = express()
const port = 5000;

// MIDDLEWARE
app.use(express.json());

//ROUTES//
// register and login
// app.use("/auth", require("./routes/loginReg"));
app.use("/auth", loginReg);

// dashboard route
// app.use("/dashboard", require("./routes/dashboard"));
app.use("/dashboard", dashboard);

// Start Server
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
})

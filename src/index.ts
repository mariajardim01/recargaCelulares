import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import db from "./database";
import { errorHandler } from "./middlewares/error-middleware";
import router from "./routers/routes";
dotenv.config()
const app = express();


app.use(json());
app.get("/health",(req: Request,res: Response) => {res.sendStatus(200)});
app.use(router)
app.use(errorHandler);


const port = process.env.PORT
app.listen(port , ()=> console.log("Server is up, on:", port))
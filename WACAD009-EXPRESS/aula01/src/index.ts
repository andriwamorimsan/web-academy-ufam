import express, { type Request, type Response } from "express";

import validateEnv from '../utils/validateEnv.js';

const env = validateEnv();
const app = express()
const PORT = env.PORT


 app.get("/", (req: Request, res: Response) => {
 res.send("Hello world!");
});

app.listen(PORT, () => {
 console.log(`Express app iniciada na porta ${PORT}.`);
});

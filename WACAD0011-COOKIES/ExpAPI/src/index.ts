import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import { v4 as uuidv4 } from "uuid";
import setLangCookie from "./middlewares/setLangCookie.js";
import router from "./router/v1Router.js";
import swaggerFile from "./swagger-output.json" with { type: "json" };

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4455);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET ?? "Hi9Cf#mK98",
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(setLangCookie);

app.get("/", (_req, res) => {
  res.json({ name: "ExpAPI", docs: "/api", version: "/v1" });
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/v1", router);

app.listen(port, () => {
  console.log(`ExpAPI running at http://localhost:${port}`);
});

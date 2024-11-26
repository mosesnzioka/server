import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { LoginUser } from "./contrallers/auth.controller.js";
import { RegisterUser } from "./contrallers/user.contraller.js";
import { 
  Createpool,
   fetchsinglePool,
   FetchingAllPools,

 } from "./contrallers/pools.contraller.js";
import verifyToken from "./middleware/verifytoken.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieparser());

app.post("/users", RegisterUser);

app.post("/auth/login", LoginUser);
app.post("/pool", verifyToken, Createpool);
app.get("/pool/:id", verifyToken, fetchsinglePool);
app.get("/pools", verifyToken, FetchingAllPools)

app.listen(4000, () => console.log("server running..."));

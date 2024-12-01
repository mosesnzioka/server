import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { LoginUser, updatePassword, logoutUser } from "./contrallers/auth.controller.js";
import { RegisterUser, UpdateUseinfo } from "./contrallers/user.contraller.js";
import {
  updateNotificationStatus,
  currentUser,
  createNotification,
  getDriverNotifications,
  deleteNotification,
} from "./contrallers/notification.contraller.js";
import {
  Createpool,
  fetchsinglePool,
  FetchingAllPools,
  fetchpoolforuser,
  Deleteuserspool
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
app.put("/user", verifyToken, UpdateUseinfo);

app.post("/auth/login", LoginUser);
app.patch("/auth/password", verifyToken, updatePassword)
app.post("/pool", verifyToken, Createpool);
app.get("/pool/user", verifyToken, fetchpoolforuser);
app.get("/pool/:id", verifyToken, fetchsinglePool);
app.delete("/pool/:id", verifyToken, Deleteuserspool)
app.get("/pools", verifyToken, FetchingAllPools);
app.post("/logout", verifyToken, logoutUser);
app.get("/current_user", verifyToken, currentUser);
app.post("/notifications", verifyToken, createNotification);
app.get("/notifications/user", verifyToken, getDriverNotifications);
app.delete("/notifications/:id", verifyToken, deleteNotification);
app.patch("/notifications/status", updateNotificationStatus);

app.listen(4000, () => console.log("server running..."));

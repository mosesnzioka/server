import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { LoginUser, logoutUser } from "./contrallers/auth.controller.js";
import { RegisterUser } from "./contrallers/user.contraller.js";
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
  getDriversPool,
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
app.get("/pool/user", getDriversPool);
app.get("/pool/:id", verifyToken, fetchsinglePool);
app.get("/pools", verifyToken, FetchingAllPools);
app.post("/logout", verifyToken, logoutUser);
app.get("/current_user", verifyToken, currentUser);
app.post("/notifications", verifyToken, createNotification);
app.get("/notifications/user", verifyToken, getDriverNotifications);
app.delete("/notifications/:id", verifyToken, deleteNotification);
app.patch("/notifications/status", updateNotificationStatus);

app.listen(4000, () => console.log("server running..."));

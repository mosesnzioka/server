import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await client.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const logoutUser = (req, res) => {
  try {
    // Clear the authToken cookie
    res.clearCookie("authToken", { httpOnly: true, path: "/" });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

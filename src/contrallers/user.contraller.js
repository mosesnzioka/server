import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const client = new PrismaClient();
export const RegisterUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 8);

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long." });
    }

    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists." });
    }

    const newUser = await client.user.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        username,
        email,
        password: hashedpassword,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

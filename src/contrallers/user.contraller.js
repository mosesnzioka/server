import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs"
const client = new PrismaClient();
export const RegisterUser = async (req, res) =>{
    try{
        const { firstName, lastName, username, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, 8)
        const newUser = await client.user.create({
            data: {
               firstname: firstName,
                lastname: lastName,
                username,
                email,
                password : hashedpassword
            }
        });
        res.status(201).json({ message: "User created successfully", user: newUser });

    }catch (error){
        res.status(500).json({message: error.message})
    }
}
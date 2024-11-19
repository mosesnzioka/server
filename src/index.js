import express from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'
const app = express()
app.use(express.json());

const client = new PrismaClient();

app.post("/users", async (req, res) =>{
    try{
        const { firstname, lastname, username, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, 8)
        const newUser = await client.user.create({
            data: {
               firstname,
                lastname,
                username,
                email,
                password : hashedpassword
            }
        });
        res.status(201).json({ message: "User created successfully", user: newUser });

    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.listen(4000, () => console.log("server running..."))
import express from "express"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import cors from "cors"
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}))

const client = new PrismaClient();

app.post("/users", async (req, res) =>{
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
})

app.post("/auth/login", async (req, res)=>{
    try{
        const { email, password} =req.body
        const user = await client.user.findFirst({
            where: {email: email}
        })
        if (!user){
            res.status(401).json({message: "wrong email or password"})
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            res.status(401).json({message: "wrong password or email"})
        }

       const token = jwt.sign(user.id, process.env.JWT_SECRET)

        res.status(200).cookie("authToken", token, {httpOnly: true}).json(user);

    }catch (error){
      res.status(500).json({message: error.message})
    }
})

app.listen(4000, () => console.log("server running..."))
import {PrismaClient} from "@prisma/client"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
const client = new PrismaClient();
export const LoginUser = async (req, res)=>{
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
}
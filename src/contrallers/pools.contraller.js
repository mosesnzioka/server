import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();
export async function Createpool(req, res){
    try{
        const {location, day, destination, departureTime, carType,
             seatsAvailable, peakPoint} =req.body
        const userId = req.userId
        const newPool= await prisma.pool.create({
            data:{
                location, day, destination, departureTime,carType,
                seatsAvailable, peakPoint, owner: userId
            }
        })
        res.status(200).json(newPool)

    }catch (error){
        res.status(500).json({message: error.message})
    }
}
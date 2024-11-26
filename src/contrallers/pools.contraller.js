import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function Createpool(req, res) {
  try {
    const {
      location,
      day,
      destination,
      departureTime,
      carType,
      seatsAvailable,
      peakPoint,
      cost,
    } = req.body;
    const userId = req.userId;

    const parsedDepartureTime = new Date(departureTime);
    if (isNaN(parsedDepartureTime.getTime())) {
      console.error("Invalid departureTime format:", departureTime);
      return res.status(400).json({ message: "Invalid departureTime format" });
    }

    const parsedCost = parseInt(cost, 10);
    if (isNaN(parsedCost)) {
      console.error("Invalid cost format:", cost);
      return res.status(400).json({ message: "Invalid cost format" });
    }

    const newPool = await prisma.pool.create({
      data: {
        location,
        day,
        destination,
        departureTime: parsedDepartureTime.toISOString(),
        carType,
        seatsAvailable: parseInt(seatsAvailable, 10),
        peakPoint,
        cost: parsedCost,
        owner: userId,
      },
    });

    res.status(200).json(newPool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function fetchsinglePool(req, res) {
  try {
    const { id } = req.params;

    const pool = await prisma.pool.findFirst({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!pool) {
      res.status(400).json({ message: "Pool not found" });
      return;
    }

    res.status(200).json(pool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function FetchingAllPools(req,res){
  try{
    const pools = await prisma.pool.findMany({
      include:{
        user: true
      }
      
    })
    res.status(200).json(pools);
  }catch (error){
    res.status(500).json({message: error.message})
  }
}
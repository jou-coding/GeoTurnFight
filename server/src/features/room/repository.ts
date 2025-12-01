import { PrismaClient } from "../../../generated/prisma/client.js";

const prisma = new PrismaClient

export async function saveRoome(name:string) {
    return await prisma.room.create({
        data:{
            name
        }
    })
}

export async function findFirst(name:string) {
    return await prisma.room.findFirst({
        where:{name:name,status:"waiting"}
    })
    
}

export async function findMany() {
    return await prisma.room.findMany({
        where:{status:"waiting"}
    })
    
}

export async function roomIdFunc(name:string) {
      const room = await prisma.room.findFirst({
    where: { name },
    select: { id: true },
  })
  return room?.id ?? null
}
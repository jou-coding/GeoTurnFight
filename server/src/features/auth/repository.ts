import { PrismaClient } from "@prisma/client";


// プリズマクライアントの作成
const prisma = new PrismaClient()

export async function saveUser(name:string,password:string) {
    return await prisma.user.create({
    data: {
      name: name,
      password: password,
    },
  });
}

export async function findUser(name:string) {
    return  await prisma.user.findUnique({where:{
    name:name
  }})
}


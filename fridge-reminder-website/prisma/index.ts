// const { PrismaClient } = require('@prisma/client');
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const allDevices = await prisma.devices.findMany()
  // console.log(allDevices)
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
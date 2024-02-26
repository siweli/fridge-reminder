const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  const allDevices = await prisma.devices.findMany()
  console.log(allDevices)
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
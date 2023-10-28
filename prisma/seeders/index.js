const { PrismaClient } = require('@prisma/client')
const productsGenerate = require('./products')
const clientsGenerate = require('./clients')
const employeesGenerate = require('./employees')
const crypto = require('crypto')

const prismaClient = new PrismaClient()

const createSeedHistory = async (seedName) => {
  await prismaClient.seedersHistory.create({
    data: {
      id: crypto.randomUUID(),
      name: seedName,
      executedAt: new Date()
    }
  })
}

const seedGenerate = async (seedName, dataGeneratorFunction, createSeederFunction) => {
  const seed = await prismaClient.seedersHistory.findFirst({ where: { name: seedName } })
  if (!seed) {
    const seedData = dataGeneratorFunction(10)

    if (seedData) {
      seedData.map(async (data) => await createSeederFunction(data))
      await createSeedHistory(seedName)
    }
  }
}

const main = async () => {
  await seedGenerate('products', productsGenerate, data => prismaClient.product.create({ data }))
  await seedGenerate('clients', clientsGenerate, data => prismaClient.client.create({ data }))
  await seedGenerate('employees', employeesGenerate, data => prismaClient.employee.create({ data }))
}

main()

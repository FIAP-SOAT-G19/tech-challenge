const { PrismaClient } = require('@prisma/client')
const productsGenerate = require('./products')
const clientsGenerate = require('./clients')
const employeesGenerate = require('./employees')

const seedGenerate = async () => {
  const prismaClient = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:postgres@localhost:5432/tech_challenge?schema=public'
      }
    }
  })
  productsGenerate(10).map(async (data) => await prismaClient.product.create({ data }))
  clientsGenerate(10).map(async (data) => await prismaClient.client.create({ data }))
  employeesGenerate(10).map(async (data) => await prismaClient.employee.create({ data }))
}

seedGenerate()

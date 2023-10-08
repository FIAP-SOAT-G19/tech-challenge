import { IEmployeeRepository, SaveEmployeeInput } from '@/ports/repositories/employee.port'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class EmployeeRepository implements IEmployeeRepository {
  async create (input: SaveEmployeeInput): Promise<string> {
    const employee = await prisma.employee.create({
      data: input
    })
    return employee.id
  }
}

import { FindEmployeeOutput, IEmployeeRepository, SaveEmployeeInput } from '@/ports/repositories/employee.port'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class EmployeeRepository implements IEmployeeRepository {
  async create (input: SaveEmployeeInput): Promise<string> {
    const employee = await prisma.employee.create({
      data: input
    })
    return employee.id
  }

  async findAll (): Promise<FindEmployeeOutput[]> {
    const employees = await prisma.employee.findMany()
    return employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      password: employee.password,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      deletedAt: employee.deletedAt
    }))
  }

  async findById (id: string): Promise<FindEmployeeOutput | null> {
    const employee = await prisma.employee.findUnique({
      where: { id }
    })
    if (!employee) return null
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      password: employee.password,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      deletedAt: employee.deletedAt
    }
  }

  async update (input: SaveEmployeeInput): Promise<string> {
    const employee = await prisma.employee.update({
      where: { id: input.id },
      data: input
    })
    return employee.id
  }

  async delete (id: string): Promise<string> {
    await prisma.employee.delete({
      where: { id }
    })
    return id
  }
}

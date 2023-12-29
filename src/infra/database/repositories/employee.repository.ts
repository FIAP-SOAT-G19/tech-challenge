import { IEmployeeRepository, SaveEmployeeInput, FindEmployeeOutput } from '@/application/interfaces/repositories/employee.interface'
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
    const employees = await prisma.employee.findMany({
      where: {
        deletedAt: null
      }
    })
    return employees.map((employee: FindEmployeeOutput) => ({
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
      where: {
        id,
        deletedAt: null
      }
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

  async findByEmail (email: string): Promise<FindEmployeeOutput | null> {
    const employee = await prisma.employee.findFirst({
      where: { email }
    })
    if (!employee) return null
    return employee
  }

  async findByCpf (cpf: string): Promise<FindEmployeeOutput | null> {
    const employee = await prisma.employee.findFirst({
      where: { cpf }
    })
    if (!employee) return null
    return employee
  }

  async update (input: SaveEmployeeInput): Promise<string> {
    const employee = await prisma.employee.update({
      where: { id: input.id },
      data: input
    })
    return employee.id
  }

  async delete (employee: SaveEmployeeInput): Promise<void> {
    await prisma.employee.update({
      where: { id: employee.id },
      data: {
        deletedAt: new Date()
      }
    })
  }
}

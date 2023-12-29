import { IReadEmployeeUseCase } from '@/application/interfaces/usecases/employee/read-employee.interface'
import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { InvalidParamError } from '@/infra/shared'

export class ReadEmployeeUseCase implements IReadEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {
  }

  async findOne(input: IReadEmployeeUseCase.Input): Promise<IReadEmployeeUseCase.Output> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) throw new InvalidParamError('Employee not found')
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    }
  }

  async findAll(): Promise<IReadEmployeeUseCase.Output[] | []> {
    const employees = await this.employeeRepository.findAll()
    if (!employees) return []
    return employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    }))
  }
}

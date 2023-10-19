import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IReadEmployeeUseCase } from '@/ports/usecases/employee/read-employee.port'

export class ReadEmployeeUseCase implements IReadEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {
  }

  async findOne(input: IReadEmployeeUseCase.Input): Promise<IReadEmployeeUseCase.Output | null> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) { return null }
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    }
  }

  async findAll(): Promise<IReadEmployeeUseCase.Output[] | null> {
    const employees = await this.employeeRepository.findAll()
    if (!employees) { return null }
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

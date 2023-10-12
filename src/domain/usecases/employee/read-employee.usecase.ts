import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IReadEmployee } from '@/ports/usecases/employee/read-employee.port'

export class ReadEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {
  }

  async findOne(input: IReadEmployee.Input): Promise<IReadEmployee.Output> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) { throw new Error('Employee not found') }
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    }
  }

  async findAll(): Promise<IReadEmployee.Output[]> {
    const employees = await this.employeeRepository.findAll()
    if (!employees) { throw new Error('Employees not found') }
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

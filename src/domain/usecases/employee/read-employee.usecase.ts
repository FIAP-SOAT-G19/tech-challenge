import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IReadEmployeeUseCase } from '@/ports/usecases/employee/read-employee.port'
import { InvalidParamError } from '../../../shared/errors'

export class ReadEmployeeUseCase implements IReadEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {
  }

  async findOne(input: IReadEmployeeUseCase.Input): Promise<IReadEmployeeUseCase.Output> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) { throw new InvalidParamError('Employee not found') }
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    }
  }

  async findAll(): Promise<IReadEmployeeUseCase.Output[]> {
    const employees = await this.employeeRepository.findAll()
    if (!employees) { throw new InvalidParamError('Employees not found') }
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

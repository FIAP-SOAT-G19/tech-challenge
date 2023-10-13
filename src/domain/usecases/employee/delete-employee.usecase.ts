import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IDeleteEmployee } from '@/ports/usecases/employee/delete-employee.port'
import { InvalidParamError } from '../../../shared/errors'

export class DeleteEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: IDeleteEmployee.Input): Promise<void> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) {
      throw new InvalidParamError('Employee not found')
    }
    await this.employeeRepository.delete(employee)
  }
}

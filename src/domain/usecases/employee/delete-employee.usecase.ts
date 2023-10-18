import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IDeleteEmployeeUseCase } from '@/ports/usecases/employee/delete-employee.port'
import { InvalidParamError } from '../../../shared/errors'

export class DeleteEmployeeUseCase implements IDeleteEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: IDeleteEmployeeUseCase.Input): Promise<void> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) {
      throw new InvalidParamError('Employee not found')
    }
    await this.employeeRepository.delete(employee)
  }
}

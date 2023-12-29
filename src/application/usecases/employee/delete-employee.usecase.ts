import { IDeleteEmployeeUseCase } from '@/application/interfaces/usecases/employee/delete-employee.interface'
import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { InvalidParamError } from '@/infra/shared'

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

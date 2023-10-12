import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IDeleteEmployee } from '@/ports/usecases/employee/delete-employee.port'

export class DeleteEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: IDeleteEmployee.Input): Promise<IDeleteEmployee.Output> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) {
      throw new Error('Employee not found')
    }
    return await this.employeeRepository.delete(input.id)
  }
}

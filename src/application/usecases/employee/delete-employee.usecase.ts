import { IDeleteEmployeeGateway } from '@/application/interfaces'
import { IDeleteEmployeeUseCase } from '@/application/interfaces/usecases/employee/delete-employee.interface'
import { InvalidParamError } from '@/infra/shared'

export class DeleteEmployeeUseCase implements IDeleteEmployeeUseCase {
  constructor(private readonly deleteEmployeeGateway: IDeleteEmployeeGateway) {}

  async execute(input: IDeleteEmployeeUseCase.Input): Promise<void> {
    const employee = await this.deleteEmployeeGateway.findById(input.id)
    if (!employee) {
      throw new InvalidParamError('Employee not found')
    }
    await this.deleteEmployeeGateway.delete(employee)
  }
}

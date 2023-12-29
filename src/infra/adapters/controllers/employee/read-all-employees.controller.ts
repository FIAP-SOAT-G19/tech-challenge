import { IController } from '@/application/interfaces'
import { ReadEmployeeUseCase } from '@/application/usecases/employee/read-employee.usecase'
import { HttpResponse, success, handleError } from '@/infra/shared'

export class ReadAllEmployeesController implements IController {
  constructor(private readonly readEmployeeUseCase: ReadEmployeeUseCase) {}

  async execute (): Promise<HttpResponse> {
    try {
      const employees = await this.readEmployeeUseCase.findAll()
      return success(200, { employees })
    } catch (error: any) {
      return handleError(error)
    }
  }
}

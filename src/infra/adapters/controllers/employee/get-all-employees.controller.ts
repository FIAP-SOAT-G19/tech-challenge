import { IController } from '@/application/interfaces'
import { GetEmployeeUseCase } from '@/application/usecases/employee/get-employee.usecase'
import { HttpResponse, success, handleError } from '@/infra/shared'

export class GetAllEmployeesController implements IController {
  constructor(private readonly getEmployeeUseCase: GetEmployeeUseCase) {}

  async execute (): Promise<HttpResponse> {
    try {
      const employees = await this.getEmployeeUseCase.findAll()
      return success(200, { employees })
    } catch (error: any) {
      return handleError(error)
    }
  }
}

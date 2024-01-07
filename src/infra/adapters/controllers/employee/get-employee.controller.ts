import { IController } from '@/application/interfaces'
import { GetEmployeeUseCase } from '@/application/usecases/employee/get-employee.usecase'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class GetEmployeeController implements IController {
  constructor(private readonly readEmployeeUseCase: GetEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const id = input.params.id
      const employee = await this.readEmployeeUseCase.findOne({ id })
      return success(200, { employee })
    } catch (error: any) {
      return handleError(error)
    }
  }
}

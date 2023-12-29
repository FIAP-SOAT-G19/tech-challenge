import { IController } from '@/application/interfaces'
import { ReadEmployeeUseCase } from '@/application/usecases/employee/read-employee.usecase'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class ReadEmployeeController implements IController {
  constructor(private readonly readEmployeeUseCase: ReadEmployeeUseCase) {}

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

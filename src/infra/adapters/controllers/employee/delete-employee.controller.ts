import { DeleteEmployeeUseCase } from '@/application/usecases/employee/delete-employee.usecase'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const id = input.params.id
      await this.deleteEmployeeUseCase.execute({
        id
      })
      return success(204, {})
    } catch (error: any) {
      return handleError(error)
    }
  }
}

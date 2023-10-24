import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { DeleteEmployeeUseCase } from './../../../domain/usecases/employee/delete-employee.usecase'
import { success, handleError } from '@/shared'

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

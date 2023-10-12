import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { DeleteEmployeeUseCase } from './../../../domain/usecases/employee/delete-employee.usecase'

export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = input.params
      const idEmployee = await this.deleteEmployeeUseCase.execute({
        id
      })
      return { statusCode: 200, body: idEmployee }
    } catch (error) {
      return { statusCode: 500, body: { error: 'Unexpected error' } }
    }
  }
}

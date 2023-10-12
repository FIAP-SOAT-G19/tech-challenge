import { ReadEmployeeUseCase } from '@/domain/usecases/employee/read-employee.usecase'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class ReadEmployeeController {
  constructor(private readonly readEmployeeUseCase: ReadEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = input.params
      const employee = await this.readEmployeeUseCase.findOne({ id })
      return { statusCode: 200, body: employee }
    } catch (error) {
      return { statusCode: 500, body: { error: 'Unexpected error' } }
    }
  }
}

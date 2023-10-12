import { ReadEmployeeUseCase } from '@/domain/usecases/employee/read-employee.usecase'
import { HttpResponse } from '@/shared/types/http.types'

export class ReadAllEmployeesController {
  constructor(private readonly readEmployeeUseCase: ReadEmployeeUseCase) {}

  async execute (): Promise<HttpResponse> {
    try {
      const employees = await this.readEmployeeUseCase.findAll()
      return { statusCode: 200, body: employees }
    } catch (error) {
      return { statusCode: 500, body: { error: 'Unexpected error' } }
    }
  }
}

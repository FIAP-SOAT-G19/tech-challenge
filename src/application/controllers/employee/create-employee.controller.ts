import { CreateEmployeeUseCase } from './../../../domain/usecases/employee/create-employee.usecase'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class CreateEmployeeController {
  constructor(private readonly createEmployeeUseCase: CreateEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, cpf, password } = input.body
      const idEmployee = await this.createEmployeeUseCase.execute({
        name,
        email,
        cpf,
        password
      })
      return { statusCode: 201, body: idEmployee }
    } catch (error) {
      return { statusCode: 500, body: { error: 'Unexpected error' } }
    }
  }
}

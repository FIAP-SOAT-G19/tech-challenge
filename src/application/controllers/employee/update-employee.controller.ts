import { UpdateEmployeeUseCase } from './../../../domain/usecases/employee/update-employee.usecase'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class UpdateEmployeeController {
  constructor(private readonly updateEmployeeUseCase: UpdateEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, cpf, password } = input.body
      const { id } = input.params
      const idEmployee = await this.updateEmployeeUseCase.execute({
        id,
        name,
        email,
        cpf,
        password
      })
      return { statusCode: 200, body: idEmployee }
    } catch (error) {
      return { statusCode: 500, body: { error: 'Unexpected error' } }
    }
  }
}

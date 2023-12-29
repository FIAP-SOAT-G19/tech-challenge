import { IController } from '@/application/interfaces'
import { CreateEmployeeUseCase } from '@/application/usecases/employee/create-employee.usecase'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class CreateEmployeeController implements IController {
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
      return success(201, { idEmployee })
    } catch (error: any) {
      return handleError(error)
    }
  }
}

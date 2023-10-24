import { UpdateEmployeeUseCase } from './../../../domain/usecases/employee/update-employee.usecase'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { IController } from '@/ports/'
import { success, handleError } from '@/shared'

export class UpdateEmployeeController implements IController {
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
      return success(200, { idEmployee })
    } catch (error: any) {
      return handleError(error)
    }
  }
}

import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { serverError, success } from '../../../shared/helpers/http.helper'

import { CreateEmployeeUseCase } from './../../../domain/usecases/employee/create-employee.usecase'
import { IController } from '../../../ports/controllers/index.port'

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
      return serverError(error)
    }
  }
}

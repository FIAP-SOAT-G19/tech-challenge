import { ReadEmployeeUseCase } from '@/domain/usecases/employee/read-employee.usecase'
import { IController } from '../../../ports/controllers/index.port'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { serverError, success } from '../../../shared/helpers/http.helper'

export class ReadEmployeeController implements IController {
  constructor(private readonly readEmployeeUseCase: ReadEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = input.params
      const employee = await this.readEmployeeUseCase.findOne({ id })
      return success(201, { employee })
    } catch (error: any) {
      return serverError(error)
    }
  }
}

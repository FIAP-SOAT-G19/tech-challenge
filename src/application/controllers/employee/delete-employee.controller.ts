import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { DeleteEmployeeUseCase } from './../../../domain/usecases/employee/delete-employee.usecase'
import { serverError, success, badRequest } from '../../../shared/helpers/http.helper'

export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = input.params
      await this.deleteEmployeeUseCase.execute({
        id
      })
      return success(204, {})
    } catch (error: any) {
      if (error.name === 'InvalidParamError') {
        return badRequest(error.message)
      }
      return serverError(error)
    }
  }
}

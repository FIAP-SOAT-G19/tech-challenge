import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { DeleteEmployeeUseCase } from './../../../domain/usecases/employee/delete-employee.usecase'
import { serverError, success, badRequest } from '../../../shared/helpers/http.helper'
import { InvalidParamError } from '../../../shared/errors'

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
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}

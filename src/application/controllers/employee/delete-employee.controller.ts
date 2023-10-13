import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { DeleteEmployeeUseCase } from './../../../domain/usecases/employee/delete-employee.usecase'
import { serverError, success } from '../../../shared/helpers/http.helper'

export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = input.params
      const idEmployee = await this.deleteEmployeeUseCase.execute({
        id
      })
      return success(200, { idEmployee })
    } catch (error: any) {
      return serverError(error)
    }
  }
}

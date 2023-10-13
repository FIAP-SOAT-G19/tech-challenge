import { ReadEmployeeUseCase } from '@/domain/usecases/employee/read-employee.usecase'
import { HttpResponse } from '@/shared/types/http.types'
import { IController } from '../../../ports/controllers/index.port'
import { serverError, success } from '../../../shared/helpers/http.helper'

export class ReadAllEmployeesController implements IController {
  constructor(private readonly readEmployeeUseCase: ReadEmployeeUseCase) {}

  async execute (): Promise<HttpResponse> {
    try {
      const employees = await this.readEmployeeUseCase.findAll()
      return success(200, { employees })
    } catch (error: any) {
      return serverError(error)
    }
  }
}

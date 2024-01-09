import { DeleteEmployeeController } from '@/infra/adapters/controllers/employee/delete-employee.controller'
import { makeDeleteEmployeeUseCase } from '../usecases/delete-employee-usecase.factory'

export const makeDeleteEmployeeController = (): DeleteEmployeeController => {
  return new DeleteEmployeeController(makeDeleteEmployeeUseCase())
}

import { UpdateEmployeeController } from '@/infra/adapters/controllers/employee/update-employee.controller'
import { makeUpdateEmployeeUseCase } from '../usecases/update-usecase.factory'

export const makeUpdateEmployeeController = (): UpdateEmployeeController => {
  return new UpdateEmployeeController(makeUpdateEmployeeUseCase())
}

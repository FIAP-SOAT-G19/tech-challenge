import { CreateEmployeeController } from '@/infra/adapters/controllers/employee/create-employee.controller'
import { makeCreateEmployeeUseCase } from '../usecases/create-employee-usecase.factory'

export const makeCreateEmployeeController = (): CreateEmployeeController => {
  return new CreateEmployeeController(makeCreateEmployeeUseCase())
}

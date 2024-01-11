import { GetEmployeeController } from '@/infra/adapters/controllers/employee/get-employee.controller'
import { makeGetAllEmployeeUseCase, makeGetEmployeeUseCase } from '../usecases/get-employee-usecase.factory'
import { GetAllEmployeesController } from '@/infra/adapters/controllers/employee/get-all-employees.controller'

export const makeGetEmployeeController = (): GetEmployeeController => {
  return new GetEmployeeController(makeGetEmployeeUseCase())
}

export const makeGetAllEmployeesController = (): GetAllEmployeesController => {
  return new GetAllEmployeesController(makeGetAllEmployeeUseCase())
}

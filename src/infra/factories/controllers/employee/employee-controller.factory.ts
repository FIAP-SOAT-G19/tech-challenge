import { CreateEmployeeController } from '@/infra/adapters/controllers/employee/create-employee.controller'
import { DeleteEmployeeController } from '@/infra/adapters/controllers/employee/delete-employee.controller'
import { ReadAllEmployeesController } from '@/infra/adapters/controllers/employee/read-all-employees.controller'
import { ReadEmployeeController } from '@/infra/adapters/controllers/employee/read-employee.controller'
import { UpdateEmployeeController } from '@/infra/adapters/controllers/employee/update-employee.controller'
import {
  makeCreateEmployeeUseCase,
  makeDeleteEmployeeUseCase,
  makeReadAllEmployeeUseCase,
  makeReadEmployeeUseCase,
  makeUpdateEmployeeUseCase
} from '../../usecases/employee/employee-usecase.factory'

export const makeCreateEmployeeController = (): CreateEmployeeController => {
  return new CreateEmployeeController(makeCreateEmployeeUseCase())
}

export const makeReadEmployeeController = (): ReadEmployeeController => {
  return new ReadEmployeeController(makeReadEmployeeUseCase())
}

export const makeReadAllEmployeesController = (): ReadAllEmployeesController => {
  return new ReadAllEmployeesController(makeReadAllEmployeeUseCase())
}

export const makeUpdateEmployeeController = (): UpdateEmployeeController => {
  return new UpdateEmployeeController(makeUpdateEmployeeUseCase())
}

export const makeDeleteEmployeeController = (): DeleteEmployeeController => {
  return new DeleteEmployeeController(makeDeleteEmployeeUseCase())
}

import { ReadEmployeeController } from '../../../../application/controllers/employee/read-employee.controller'
import { CreateEmployeeController } from '../../../../application/controllers/employee/create-employee.controller'
import { UpdateEmployeeController } from '../../../../application/controllers/employee/update-employee.controller'
import { ReadAllEmployeesController } from '../../../../application/controllers/employee/read-all-employees.controller'
import { DeleteEmployeeController } from '../../../../application/controllers/employee/delete-employee.controller'
import { CreateEmployeeUseCase } from '../../../../domain/usecases/employee/create-employee.usecase'
import { UpdateEmployeeUseCase } from '../../../../domain/usecases/employee/update-employee.usecase'
import { DeleteEmployeeUseCase } from '../../../../domain/usecases/employee/delete-employee.usecase'
import { ReadEmployeeUseCase } from '../../../../domain/usecases/employee/read-employee.usecase'
import { EmployeeRepository } from '../../../database/repositories/employee.repository'

export const makeCreateEmployeeController = (): CreateEmployeeController => {
  const employeeRepository = new EmployeeRepository()
  const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository)

  return new CreateEmployeeController(createEmployeeUseCase)
}

export const makeReadEmployeeController = (): ReadEmployeeController => {
  const employeeRepository = new EmployeeRepository()
  const readEmployeeUseCase = new ReadEmployeeUseCase(employeeRepository)

  return new ReadEmployeeController(readEmployeeUseCase)
}

export const makeReadAllEmployeesController = (): ReadAllEmployeesController => {
  const employeeRepository = new EmployeeRepository()
  const readEmployeeUseCase = new ReadEmployeeUseCase(employeeRepository)

  return new ReadAllEmployeesController(readEmployeeUseCase)
}

export const makeUpdateEmployeeController = (): UpdateEmployeeController => {
  const employeeRepository = new EmployeeRepository()
  const updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository)

  return new UpdateEmployeeController(updateEmployeeUseCase)
}

export const makeDeleteEmployeeController = (): DeleteEmployeeController => {
  const employeeRepository = new EmployeeRepository()
  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepository)

  return new DeleteEmployeeController(deleteEmployeeUseCase)
}

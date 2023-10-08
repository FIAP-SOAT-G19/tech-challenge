import { CreateEmployeeController } from '../../../../application/controllers/employee/create-employee.controller'
import { CreateEmployeeUseCase } from '../../../../domain/usecases/employee/create-employee.usecase'
import { EmployeeRepository } from '../../../database/repositories/employee.repository'

export const makeEmployeeController = (): CreateEmployeeController => {
  const employeeRepository = new EmployeeRepository()
  const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository)

  return new CreateEmployeeController(createEmployeeUseCase)
}

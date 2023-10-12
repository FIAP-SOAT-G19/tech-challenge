import { CreateEmployeeUseCase } from '../../../../domain/usecases/employee/create-employee.usecase'
import { ReadEmployeeUseCase } from '../../../../domain/usecases/employee/read-employee.usecase'
import { UpdateEmployeeUseCase } from '../../../../domain/usecases/employee/update-employee.usecase'
import { DeleteEmployeeUseCase } from '../../../../domain/usecases/employee/delete-employee.usecase'

import { EmployeeRepository } from '../../../database/repositories/employee.repository'

import { UUIDGeneratorAdapter } from '../../../../infra/adapters/uuid/uuid-generator'

const uuidGenerator = new UUIDGeneratorAdapter()
const employeeRepository = new EmployeeRepository()

export const makeCreateEmployeeUseCase = (): CreateEmployeeUseCase => {
  return new CreateEmployeeUseCase(
    employeeRepository,
    uuidGenerator
  )
}

export const makeReadEmployeeUseCase = (): ReadEmployeeUseCase => {
  return new ReadEmployeeUseCase(employeeRepository)
}

export const makeReadAllEmployeeUseCase = (): ReadEmployeeUseCase => {
  return new ReadEmployeeUseCase(employeeRepository)
}

export const makeUpdateEmployeeUseCase = (): UpdateEmployeeUseCase => {
  return new UpdateEmployeeUseCase(employeeRepository)
}

export const makeDeleteEmployeeUseCase = (): DeleteEmployeeUseCase => {
  return new DeleteEmployeeUseCase(employeeRepository)
}

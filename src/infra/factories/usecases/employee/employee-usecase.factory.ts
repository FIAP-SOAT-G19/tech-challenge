import { CreateEmployeeUseCase } from '@/application/usecases/employee/create-employee.usecase'
import { DeleteEmployeeUseCase } from '@/application/usecases/employee/delete-employee.usecase'
import { ReadEmployeeUseCase } from '@/application/usecases/employee/read-employee.usecase'
import { UpdateEmployeeUseCase } from '@/application/usecases/employee/update-employee.usecase'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { EmployeeRepository } from '../../../database/repositories/employee.repository'

const uuidGenerator = new UUIDGeneratorAdapter()
const employeeRepository = new EmployeeRepository()
const schemaValidator = new JoiValidatorSchemaAdapter()
const encryptoPassword = new BcryptAdapter()

export const makeCreateEmployeeUseCase = (): CreateEmployeeUseCase => {
  return new CreateEmployeeUseCase(
    employeeRepository,
    schemaValidator,
    uuidGenerator,
    encryptoPassword
  )
}

export const makeReadEmployeeUseCase = (): ReadEmployeeUseCase => {
  return new ReadEmployeeUseCase(employeeRepository)
}

export const makeReadAllEmployeeUseCase = (): ReadEmployeeUseCase => {
  return new ReadEmployeeUseCase(employeeRepository)
}

export const makeUpdateEmployeeUseCase = (): UpdateEmployeeUseCase => {
  return new UpdateEmployeeUseCase(
    employeeRepository,
    schemaValidator,
    encryptoPassword
  )
}

export const makeDeleteEmployeeUseCase = (): DeleteEmployeeUseCase => {
  return new DeleteEmployeeUseCase(employeeRepository)
}

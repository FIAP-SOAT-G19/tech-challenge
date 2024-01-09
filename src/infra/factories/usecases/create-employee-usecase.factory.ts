import { CreateEmployeeUseCase } from '@/application/usecases/employee/create-employee.usecase'
import { CreateEmployeeGateway } from '@/infra/adapters/gateways/employee/create-employee.gateway'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'

export const makeCreateEmployeeUseCase = (): CreateEmployeeUseCase => {
  const uuidGenerator = new UUIDGeneratorAdapter()
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const encryptoPassword = new BcryptAdapter()
  const gateway = new CreateEmployeeGateway(
    new EmployeeRepository()
  )

  return new CreateEmployeeUseCase(
    gateway,
    schemaValidator,
    uuidGenerator,
    encryptoPassword
  )
}

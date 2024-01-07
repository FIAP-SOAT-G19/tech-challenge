import { UpdateEmployeeUseCase } from '@/application/usecases/employee/update-employee.usecase'
import { UpdateEmployeeGateway } from '@/infra/adapters/gateways/employee/update-employee.gateway'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'

export const makeUpdateEmployeeUseCase = (): UpdateEmployeeUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const encryptoPassword = new BcryptAdapter()
  const gateway = new UpdateEmployeeGateway(
    new EmployeeRepository()
  )

  return new UpdateEmployeeUseCase(
    gateway,
    schemaValidator,
    encryptoPassword
  )
}

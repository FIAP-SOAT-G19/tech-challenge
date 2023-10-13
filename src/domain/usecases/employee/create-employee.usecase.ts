import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'

import { ICreateEmployee } from '@/ports/usecases/employee/create-employee.port'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'

import { InvalidParamError, SchemaValidationError } from '../../../shared/errors'
import constants from '../../../shared/constants'
import { cryptoPassword } from '../../../shared/utils/encryptoPassword.util'

export class CreateEmployeeUseCase implements ICreateEmployee {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator
  ) {}

  async execute (input: ICreateEmployee.Input): Promise<ICreateEmployee.Output> {
    await this.validateInput(input)

    const password = cryptoPassword(input.password)

    return await this.employeeRepository.create({
      id: this.uuidGenerator.generate(),
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
  }

  private async validateInput (input: ICreateEmployee.Input): Promise<void> {
    const requiredError = this.validateRequired(input)
    if (requiredError) throw new InvalidParamError(requiredError)

    const emailAlreadyInUse = await this.employeeRepository.findByEmail(input.email)
    if (emailAlreadyInUse) throw new InvalidParamError('Email already in use')

    const cpfAlreadyInUse = await this.employeeRepository.findByCpf(input.cpf)
    if (cpfAlreadyInUse) throw new InvalidParamError('CPF already in use')

    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.EMPLOYEE,
      data: input
    })

    if (validation.error) throw new SchemaValidationError(validation.error)
  }

  private validateRequired(input: ICreateEmployee.Input): string | null {
    const requiredFields: Array<keyof ICreateEmployee.Input> = ['name', 'email', 'cpf', 'password']

    for (const field of requiredFields) {
      if (!input[field]) {
        return `The '${field}' field is required.`
      }
    }

    return null
  }
}

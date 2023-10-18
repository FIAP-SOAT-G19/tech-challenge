import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'

import { ICreateEmployeeUseCase } from '@/ports/usecases/employee/create-employee.port'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'

import { InvalidParamError, SchemaValidationError } from '../../../shared/errors'
import constants from '../../../shared/constants'
import { cryptoPassword } from '../../../shared/utils/encryptoPassword.util'

export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator
  ) {}

  async execute (input: ICreateEmployeeUseCase.Input): Promise<ICreateEmployeeUseCase.Output> {
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

  private async validateInput (input: ICreateEmployeeUseCase.Input): Promise<void> {
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

  private validateRequired(input: ICreateEmployeeUseCase.Input): string | null {
    const requiredFields: Array<keyof ICreateEmployeeUseCase.Input> = ['name', 'email', 'cpf', 'password']

    for (const field of requiredFields) {
      if (!input[field]) {
        return `The '${field}' field is required.`
      }
    }

    return null
  }
}

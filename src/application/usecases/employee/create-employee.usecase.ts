import { ICreateEmployeeGateway, ISchemaValidator, IUUIDGenerator } from '@/application/interfaces'
import { ICreateEmployeeUseCase } from '@/application/interfaces/usecases/employee/create-employee.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError, SchemaValidationError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {
  constructor(
    private readonly createEmployeeGateway: ICreateEmployeeGateway,
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly encryptoPassword: IEncrypt
  ) { }

  async execute(input: ICreateEmployeeUseCase.Input): Promise<ICreateEmployeeUseCase.Output> {
    await this.validateInput(input)

    return await this.createEmployeeGateway.create({
      id: this.uuidGenerator.generate(),
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      password: this.encryptoPassword.encrypt(input.password),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    })
  }

  private async validateInput(input: ICreateEmployeeUseCase.Input): Promise<void> {
    const requiredError = this.validateRequired(input)
    if (requiredError) throw new InvalidParamError(requiredError)

    const emailAlreadyInUse = await this.createEmployeeGateway.findByEmail(input.email)
    if (emailAlreadyInUse) throw new InvalidParamError('Email already in use')

    const cpfAlreadyInUse = await this.createEmployeeGateway.findByCpf(input.cpf)
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

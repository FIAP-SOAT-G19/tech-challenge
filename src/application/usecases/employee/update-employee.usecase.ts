import { ISchemaValidator } from '@/application/interfaces'
import { IUpdateEmployeeUseCase } from '@/application/interfaces/usecases/employee/update-employee.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { InvalidParamError, SchemaValidationError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class UpdateEmployeeUseCase implements IUpdateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly schemaValidator: ISchemaValidator,
    private readonly encryptoPassword: IEncrypt
  ) {
  }

  async execute(input: IUpdateEmployeeUseCase.Input): Promise<IUpdateEmployeeUseCase.Output> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) { throw new InvalidParamError('Employee not found') }

    await this.validateInput(input)

    const password = input.password
      ? this.encryptoPassword.encrypt(input.password)
      : employee.password

    const updatedEmployee = {
      id: input.id,
      name: input.name ? input.name : employee.name,
      email: input.email ? input.email : employee.email,
      cpf: input.cpf ? input.cpf : employee.cpf,
      password,
      createdAt: employee.createdAt,
      updatedAt: new Date(),
      deletedAt: employee.deletedAt
    }
    return await this.employeeRepository.update(updatedEmployee)
  }

  private async validateInput(input: IUpdateEmployeeUseCase.Input): Promise<void> {
    if (input.email) {
      const emailAlreadyInUse = await this.employeeRepository.findByEmail(input.email)
      if (emailAlreadyInUse && input.id !== emailAlreadyInUse.id) throw new InvalidParamError('Email already in use')
    }

    if (input.cpf) {
      const cpfAlreadyInUse = await this.employeeRepository.findByCpf(input.cpf)
      if (cpfAlreadyInUse && input.id !== cpfAlreadyInUse.id) throw new InvalidParamError('CPF already in use')
    }

    const validation = this.schemaValidator.validate({
      schema: constants.SCHEMAS.EMPLOYEE,
      data: {
        name: input.name,
        email: input.email,
        cpf: input.cpf,
        password: input.password
      }
    })

    if (validation.error) throw new SchemaValidationError(validation.error)
  }
}

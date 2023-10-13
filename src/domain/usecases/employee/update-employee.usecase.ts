import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IUpdateEmployee } from '@/ports/usecases/employee/update-employee.port'
import { ISchemaValidator } from '@/ports/validators/schema-validator.port'

import { cryptoPassword } from '../../../shared/utils/encryptoPassword.util'
import { InvalidParamError } from '../../../shared/errors'
import constants from '../../../shared/constants'

export class UpdateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly schemaValidator: ISchemaValidator
  ) {
  }

  async execute(input: IUpdateEmployee.Input): Promise<IUpdateEmployee.Output> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) { throw new Error('Employee not found') }

    await this.validateInput(input)

    const password = input.password ? cryptoPassword(input.password) : employee.password

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

  private async validateInput (input: IUpdateEmployee.Input): Promise<void> {
    if (input.email) {
      const emailAlreadyInUse = await this.employeeRepository.findByEmail(input.email)
      if (emailAlreadyInUse) throw new InvalidParamError('Email already in use')
    }

    if (input.cpf) {
      const cpfAlreadyInUse = await this.employeeRepository.findByCpf(input.cpf)
      if (cpfAlreadyInUse) throw new InvalidParamError('CPF already in use')
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

    if (validation.error) throw new InvalidParamError(validation.error)
  }
}

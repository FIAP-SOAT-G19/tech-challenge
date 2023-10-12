import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { ICreateEmployee } from '@/ports/usecases/employee/create-employee.port'
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'

export class CreateEmployeeUseCase implements ICreateEmployee {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly uuidGenerator: IUUIDGenerator
  ) {}

  async execute (input: ICreateEmployee.Input): Promise<ICreateEmployee.Output> {
    return await this.employeeRepository.create({
      id: this.uuidGenerator.generate(),
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      password: input.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
  }
}

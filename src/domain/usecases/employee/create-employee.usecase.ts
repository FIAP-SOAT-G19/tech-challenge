import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { ICreateEmployee } from '@/ports/usecases/employee/create-employee.port'
import { v4 as uuidv4 } from 'uuid'

export class CreateEmployeeUseCase implements ICreateEmployee {
  constructor(
    private readonly employeeRepository: EmployeeRepository
  ) {}

  async execute (input: ICreateEmployee.Input): Promise<ICreateEmployee.Output> {
    return await this.employeeRepository.create({
      id: uuidv4(),
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

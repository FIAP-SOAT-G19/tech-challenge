import { EmployeeRepository } from '@/infra/database/repositories/employee.repository'
import { IUpdateEmployee } from '@/ports/usecases/employee/update-employee.port'

export class UpdateEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {
  }

  async execute(input: IUpdateEmployee.Input): Promise<IUpdateEmployee.Output> {
    const employee = await this.employeeRepository.findById(input.id)
    if (!employee) { throw new Error('Employee not found') }
    const updatedEmployee = {
      id: input.id,
      name: input.name ? input.name : employee.name,
      email: input.email ? input.email : employee.email,
      cpf: input.cpf ? input.cpf : employee.cpf,
      password: input.password ? input.password : employee.password,
      createdAt: employee.createdAt,
      updatedAt: new Date(),
      deletedAt: employee.deletedAt
    }
    return await this.employeeRepository.update(updatedEmployee)
  }
}

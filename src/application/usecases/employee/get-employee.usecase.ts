import { IGetEmployeeGateway } from '@/application/interfaces'
import { IGetEmployeeUseCase } from '@/application/interfaces/usecases/employee/get-employee.interface'
import { InvalidParamError } from '@/infra/shared'

export class GetEmployeeUseCase implements IGetEmployeeUseCase {
  constructor(private readonly getEmployeeGateway: IGetEmployeeGateway) {
  }

  async findById(id: string): Promise<IGetEmployeeUseCase.Output> {
    const employee = await this.getEmployeeGateway.findById(id)
    if (!employee) throw new InvalidParamError('Employee not found')
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    }
  }

  async findAll(): Promise<IGetEmployeeUseCase.Output[] | []> {
    const employees = await this.getEmployeeGateway.findAll()
    return employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      cpf: employee.cpf,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    }))
  }
}

import { FindEmployeeOutput, IDeleteEmployeeGateway, IEmployeeRepository } from '@/application/interfaces'

export class DeleteEmployeeGateway implements IDeleteEmployeeGateway {
  constructor(
    private readonly employeeRepository: IEmployeeRepository
  ) {}

  async findById (id: string): Promise<FindEmployeeOutput | null> {
    return await this.employeeRepository.findById(id)
  }

  async delete (employee: FindEmployeeOutput): Promise<void> {
    await this.employeeRepository.delete(employee)
  }
}

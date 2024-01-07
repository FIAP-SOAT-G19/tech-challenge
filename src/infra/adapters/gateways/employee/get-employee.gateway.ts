import { FindEmployeeOutput, IEmployeeRepository, IGetEmployeeGateway } from '@/application/interfaces'

export class GetEmployeeGateway implements IGetEmployeeGateway {
  constructor(private readonly employeeRepository: IEmployeeRepository
  ) {}

  async findAll(): Promise<FindEmployeeOutput[]> {
    return await this.employeeRepository.findAll()
  }

  async findById(id: string): Promise<FindEmployeeOutput | null> {
    return await this.employeeRepository.findById(id)
  }
}

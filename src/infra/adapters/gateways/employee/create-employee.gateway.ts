import { ICreateEmployeeGateway, IEmployeeRepository, SaveEmployeeInput } from '@/application/interfaces'

export class CreateEmployeeGateway implements ICreateEmployeeGateway {
  constructor(
    private readonly employeeRepository: IEmployeeRepository
  ) {}

  async create (input: SaveEmployeeInput): Promise<string> {
    return await this.employeeRepository.create(input)
  }

  async findByEmail (email: string): Promise<SaveEmployeeInput | null> {
    return await this.employeeRepository.findByEmail(email)
  }

  async findByCpf (cpf: string): Promise<SaveEmployeeInput | null> {
    return await this.employeeRepository.findByCpf(cpf)
  }
}

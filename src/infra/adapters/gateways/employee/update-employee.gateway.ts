import { FindEmployeeOutput, IEmployeeRepository, IUpdateEmployeeGateway } from '@/application/interfaces'

export class UpdateEmployeeGateway implements IUpdateEmployeeGateway {
  constructor(
    private readonly employeeRepository: IEmployeeRepository
  ) {}

  async findById (id: string): Promise<FindEmployeeOutput | null> {
    return await this.employeeRepository.findById(id)
  }

  async findByEmail (email: string): Promise<FindEmployeeOutput | null> {
    return await this.employeeRepository.findByEmail(email)
  }

  async findByCpf (cpf: string): Promise<FindEmployeeOutput | null> {
    return await this.employeeRepository.findByCpf(cpf)
  }

  async update (input: FindEmployeeOutput): Promise<string> {
    return await this.employeeRepository.update(input)
  }
}

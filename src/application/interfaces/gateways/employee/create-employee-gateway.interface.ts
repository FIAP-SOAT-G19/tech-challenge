import { FindEmployeeOutput, SaveEmployeeInput } from '@/application/interfaces'

export interface ICreateEmployeeGateway {
  create: (input: SaveEmployeeInput) => Promise<string>
  findByEmail: (email: string) => Promise<FindEmployeeOutput | null>
  findByCpf: (cpf: string) => Promise<FindEmployeeOutput | null>
}

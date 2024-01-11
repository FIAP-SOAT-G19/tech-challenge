import { FindEmployeeOutput, SaveEmployeeInput } from '@/application/interfaces'

export interface IUpdateEmployeeGateway {
  findById: (id: string) => Promise<FindEmployeeOutput | null>
  findByEmail: (email: string) => Promise<FindEmployeeOutput | null>
  findByCpf: (cpf: string) => Promise<FindEmployeeOutput | null>
  update: (input: SaveEmployeeInput) => Promise<string>
}

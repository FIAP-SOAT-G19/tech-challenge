export interface IEmployeeRepository {
  create: (input: SaveEmployeeInput) => Promise<string>
  findAll: () => Promise<FindEmployeeOutput[]>
  findById: (id: string) => Promise<FindEmployeeOutput | null>
  findByEmail: (email: string) => Promise<FindEmployeeOutput | null>
  findByCpf: (cpf: string) => Promise<FindEmployeeOutput | null>
  update: (input: SaveEmployeeInput) => Promise<string>
  delete: (employee: SaveEmployeeInput) => Promise<void>
}

export type SaveEmployeeInput = {
  id: string
  name: string
  email: string
  cpf: string
  password: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type FindEmployeeOutput = SaveEmployeeInput

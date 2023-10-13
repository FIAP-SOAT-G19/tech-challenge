export interface IEmployeeRepository {
  create: (input: SaveEmployeeInput) => Promise<string>
  findAll: () => Promise<FindEmployeeOutput[]>
  findById: (id: string) => Promise<FindEmployeeOutput | null>
  update: (input: SaveEmployeeInput) => Promise<string>
  delete: (employee: SaveEmployeeInput) => Promise<string>
}

export type SaveEmployeeInput = {
  id: string
  name: string
  email: string
  cpf: string
  password: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export type FindEmployeeOutput = SaveEmployeeInput

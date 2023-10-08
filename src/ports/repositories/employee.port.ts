export interface IEmployeeRepository {
  create: (input: SaveEmployeeInput) => Promise<string>
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

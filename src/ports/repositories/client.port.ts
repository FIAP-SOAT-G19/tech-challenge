export type Client = {
  id: string
  name: string
  email: string
  password: string
  cpf: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type SaveClientInput = Pick<Client, 'id' | 'name' | 'email' | 'password' | 'cpf' | 'createdAt'>
export type UpdateClientInput = Pick<Client, 'id' | 'name' | 'email' | 'cpf' | 'updatedAt'>

export type GetAllClientsInput = {
  id?: string
  cpf?: string
  email?: string
}

export interface IClientRepository {
  getById: (clientId: string) => Promise<Client | null>
  getByEmail: (email: string) => Promise<Client | null>
  getByDocument: (document: string) => Promise<Client | null>
  getAll: (input: GetAllClientsInput) => Promise<Client[] | null>
  save: (input: SaveClientInput) => Promise<string>
  update: (input: UpdateClientInput) => Promise<string>
  delete: (clientId: string) => Promise<void>
}

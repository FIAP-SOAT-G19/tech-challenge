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

export interface IClientRepository {
  getById: (clientId: string) => Promise<Client | null>
}

export type Client = {
  id: string
  name: string
  email: string
  password: string
  cpf: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface IClientRepository {
  getById: (clientId: string) => Promise<Client | null>
  getByCpf: (cpf: string) => Promise<Client | null>
}

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

export interface IGetClientByIdUSeCase {
  execute: (clientId: string) => Promise<Client | undefined>
}

import { Client, UpdateClientInput } from '@/application/interfaces'

export interface IUpdateClientGateway {
  getClientById: (clientId: string) => Promise<Client | null>
  getClientByEmail: (email: string) => Promise<Client | null>
  getClientByDocument: (document: string) => Promise<Client | null>
  updateClient: (input: UpdateClientInput) => Promise<string>
}

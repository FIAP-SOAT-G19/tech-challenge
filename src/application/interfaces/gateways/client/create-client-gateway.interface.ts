import { Client, SaveClientInput } from '@/application/interfaces'

export interface ICreateClientGateway {
  getClientByEmail: (email: string) => Promise<Client | null>
  getClientByDocument: (document: string) => Promise<Client | null>
  saveClient: (input: SaveClientInput) => Promise<string>
}

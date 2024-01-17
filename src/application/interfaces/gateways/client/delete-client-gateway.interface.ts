import { Client } from '@/application/interfaces'

export interface IDeleteClientGateway {
  getClientById: (clientId: string) => Promise<Client | null>
  deleteClient: (clientId: string) => Promise<void>
}

import { Client } from '@/application/interfaces'

export interface ILoginClientGateway {
  getClientByEmail: (email: string) => Promise<Client | null>
}

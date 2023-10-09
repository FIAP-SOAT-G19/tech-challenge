import { Client } from '@/domain/types/clients.types'

export interface IClientRepository {
  getByCpf: (cpf: string) => Promise<Client | null>
  getById: (clientId: string) => Promise<Client | null>
}

import { Client, IClientRepository } from '@/ports'
import { prismaClient } from '../prisma-client'

export class ClientRepository implements IClientRepository {
  async getById (clientId: string): Promise<Client | null> {
    const client = await prismaClient.client.findUnique({ where: { id: clientId } })
    return client ?? null
  }

  async getByCpf(cpf: string): Promise<Client | null> {
    const client = await prismaClient.client.findFirst({ where: { cpf } })

    return client
  }
}

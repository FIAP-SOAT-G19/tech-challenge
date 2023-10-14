import { Client, IClientRepository, SaveClientInput } from '@/ports'
import { prismaClient } from '../prisma-client'

export class ClientRepository implements IClientRepository {
  async getById(clientId: string): Promise<Client | null> {
    const client = await prismaClient.client.findUnique({ where: { id: clientId } })
    return client ?? null
  }

  async getByEmail(email: string): Promise<Client | null> {
    const client = await prismaClient.client.findFirst({ where: { email } })
    return client ?? null
  }

  async getByDocument(document: string): Promise<Client | null> {
    const client = await prismaClient.client.findFirst({ where: { cpf: document } })
    return client ?? null
  }

  async save(input: SaveClientInput): Promise<string> {
    const order = await prismaClient.client.create({
      data: {
        id: input.id,
        cpf: input.cpf,
        name: input.name,
        email: input.email,
        password: input.password,
        createdAt: input.createdAt
      }
    })
    return order.id
  }
}

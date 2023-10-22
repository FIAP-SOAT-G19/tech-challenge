import { Client, IClientRepository, SaveClientInput, UpdateClientInput } from '@/ports'
import { prismaClient } from '@/infra/database/prisma-client'

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
    const client = await prismaClient.client.create({
      data: {
        id: input.id,
        cpf: input.cpf,
        name: input.name,
        email: input.email,
        password: input.password,
        createdAt: input.createdAt
      }
    })
    return client.id
  }

  async update(input: UpdateClientInput): Promise<string> {
    const client = await prismaClient.client.update({
      data: {
        cpf: input.cpf,
        name: input.name,
        email: input.email,
        password: input.password,
        updatedAt: input.updatedAt
      },
      where: {
        id: input.id
      }
    })
    return client.id
  }

  async delete(clientId: string): Promise<string> {
    const client = await prismaClient.client.delete({ where: { id: clientId } })
    return client.id
  }
}

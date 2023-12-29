
import { Client, GetAllClientsInput, IClientRepository, SaveClientInput, UpdateClientInput } from '@/application/interfaces'
import { prismaClient } from '@/infra/database/prisma-client'

export class ClientRepository implements IClientRepository {
  async getById(clientId: string): Promise<Client | null> {
    const client = await prismaClient.client.findUnique({ where: { id: clientId, deletedAt: null } })
    return client ?? null
  }

  async getByEmail(email: string): Promise<Client | null> {
    const client = await prismaClient.client.findFirst({ where: { email: email ?? '', deletedAt: null } })
    return client ?? null
  }

  async getByDocument(document: string): Promise<Client | null> {
    const client = await prismaClient.client.findFirst({ where: { cpf: document ?? '', deletedAt: null } })
    return client ?? null
  }

  async getAll(input: GetAllClientsInput): Promise<Client[] | null> {
    const clients = await prismaClient.client.findMany({
      where: { ...input, deletedAt: null }
    })
    return clients ?? null
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
        updatedAt: input.updatedAt
      },
      where: {
        id: input.id
      }
    })
    return client.id
  }

  async delete(clientId: string): Promise<void> {
    await prismaClient.client.update({
      data: { deletedAt: new Date() },
      where: { id: clientId }
    })
  }
}

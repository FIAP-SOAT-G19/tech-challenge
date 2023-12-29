import { IOrderProductRepository, SaveOrderProductInput } from '@/application/interfaces'
import { prismaClient } from '../prisma-client'

export class OrderProductRepository implements IOrderProductRepository {
  async save(data: SaveOrderProductInput): Promise<void> {
    await prismaClient.orderProduct.create({ data })
  }
}

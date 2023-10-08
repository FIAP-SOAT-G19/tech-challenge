import { IOrderRepository, SaveOrderInput } from '@/ports'
import { prismaClient } from '../prisma-client'
import { OrderStatus } from '@prisma/client'

export class OrderRepository implements IOrderRepository {
  async save(input: SaveOrderInput): Promise<string> {
    const order = await prismaClient.order.create({
      data: {
        id: input.id,
        clientId: input.clientId,
        status: input.status as OrderStatus,
        totalValue: input.totalValue
      }
    })

    return order.id
  }

  async updateStatus(status: string, id: string): Promise<void> {
    await prismaClient.order.update({
      data: {
        status: status as OrderStatus
      },
      where: {
        id
      }
    })
  }
}

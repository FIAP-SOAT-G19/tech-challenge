import { IOrderRepository, SaveOrderInput, UpdateOrderStatusInput } from '@/ports'
import { prismaClient } from '../prisma-client'
import { OrderStatus } from '@prisma/client'

export class OrderRepository implements IOrderRepository {
  async save(input: SaveOrderInput): Promise<string> {
    const order = await prismaClient.order.create({
      data: {
        id: input.id,
        orderNumber: input.orderNumber,
        clientId: input.clientId,
        clientDocument: input.clientDocument,
        status: input.status as OrderStatus,
        totalValue: input.totalValue
      }
    })

    return order.id
  }

  async updateStatus(input: UpdateOrderStatusInput): Promise<void> {
    await prismaClient.order.update({
      data: {
        status: status as OrderStatus,
        paidAt: input.paidAt
      },
      where: {
        orderNumber: input.orderNumber
      }
    })
  }
}

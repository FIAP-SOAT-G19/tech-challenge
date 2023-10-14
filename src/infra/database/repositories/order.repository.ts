import { IOrderRepository, SaveOrderInput, UpdateOrderStatusInput } from '@/ports'
import { prismaClient } from '../prisma-client'
import { OrderStatus } from '@prisma/client'
import { OrderOutput } from '@/domain/types/orders.types'
import { Product } from '@/domain/types/products.types'

export class OrderRepository implements IOrderRepository {
  async save(input: SaveOrderInput): Promise<string> {
    const order = await prismaClient.order.create({
      data: {
        id: input.id,
        orderNumber: input.orderNumber,
        clientId: input.clientId,
        clientDocument: input.clientDocument,
        status: input.status as OrderStatus,
        totalValue: input.totalValue,
        createdAt: input.createdAt
      }
    })

    return order.id
  }

  async updateStatus(input: UpdateOrderStatusInput): Promise<void> {
    await prismaClient.order.update({
      data: {
        status: input.status as OrderStatus,
        paidAt: input.paidAt
      },
      where: {
        orderNumber: input.orderNumber
      }
    })
  }

  async getByOrderNumber (orderNumber: string): Promise<OrderOutput> {
    let output: OrderOutput = null

    const order = await prismaClient.order.findFirst({
      select: {
        id: true,
        orderNumber: true,
        clientDocument: true,
        clientId: true,
        status: true,
        totalValue: true,
        paidAt: true,
        createdAt: true,
        client: {
          select: {
            name: true,
            email: true,
            cpf: true
          }
        },
        OrderProduct: {
          select: {
            id: true,
            amount: true,
            orderId: true,
            product: {
              select: {
                id: true,
                name: true,
                category: true,
                price: true,
                description: true,
                image: true
              }
            }

          }
        }
      },
      where: {
        orderNumber
      }
    })

    if (order) {
      const products: Product [] = []
      order.OrderProduct.map((product) => {
        products.push({
          id: product.product.id,
          name: product.product.name,
          category: product.product.category,
          price: product.product.price,
          description: product.product.description,
          image: product.product.image,
          amount: product.amount
        })
        return products
      })

      output = {
        id: order.id,
        orderNumber: order.orderNumber,
        clientDocument: order.clientDocument,
        clientId: order.clientId,
        status: order.status,
        totalValue: order.totalValue,
        paidAt: order.paidAt,
        createdAt: order.createdAt,
        client: {
          name: order.client?.name ?? '',
          email: order.client?.email ?? '',
          cpf: order.client?.cpf ?? ''
        },
        products
      }
    }
    return output
  }
}

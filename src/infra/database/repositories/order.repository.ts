import { GetAllOrdersInput, GetAllOrdersOutput, IOrderRepository, SaveOrderInput, UpdateOrderStatusInput } from '@/application/interfaces'
import { prismaClient } from '../prisma-client'
import { OrderOutput, OrderProduct } from '@/application/usecases/order/orders.types'

type OrderStatus = 'waitingPayment' | 'received' | 'InPreparation' | 'prepared' | 'finalized' | 'canceled'

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
      const products: OrderProduct [] = []
      order.OrderProduct.map((product: any) => {
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

  async delete(orderNumber: string): Promise<void> {
    await prismaClient.order.delete({ where: { orderNumber } })
  }

  async getAll(input: GetAllOrdersInput): Promise<GetAllOrdersOutput> {
    const output: GetAllOrdersOutput = []

    const where: any = {}

    if (input.clientId) {
      where.clientId = input.clientId
    }

    if (input.clientDocument) {
      where.clientDocument = input.clientDocument
    }

    if (input.status) {
      where.status = input.status
    } else {
      where.status = {
        notIn: ['waitingPayment', 'finalized', 'canceled']
      }
    }

    if (input.paidAtInitialDate) {
      const paidAtEndDate = input.paidAtEndDate ? new Date(input.paidAtEndDate) : new Date()
      where.paidAt = {
        lte: new Date(paidAtEndDate),
        gte: new Date(input.paidAtInitialDate)
      }
    }

    if (input.createdAtInitialDate) {
      const createdAtEndDate = input.createdAtEndDate ? new Date(input.createdAtEndDate) : new Date()
      where.createdAt = {
        lte: new Date(createdAtEndDate),
        gte: new Date(input.createdAtInitialDate)
      }
    }

    const orders = await prismaClient.order.findMany({
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
            amount: true,
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
      where
    })

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        output.push({
          id: orders[i].id,
          orderNumber: orders[i].orderNumber,
          clientDocument: orders[i].clientDocument,
          clientId: orders[i].clientId,
          status: orders[i].status,
          totalValue: orders[i].totalValue,
          paidAt: orders[i].paidAt,
          createdAt: orders[i].createdAt,
          client: {
            name: orders[i].client?.name ?? '',
            email: orders[i].client?.email ?? '',
            cpf: orders[i].client?.cpf ?? ''
          },
          products: orders[i].OrderProduct.map((product: any) => ({
            id: product.product.id,
            name: product.product.name,
            category: product.product.category,
            price: product.product.price,
            description: product.product.description,
            image: product.product.image,
            amount: product.amount
          }))
        })
      }
    }

    return output.length ? output : null
  }
}

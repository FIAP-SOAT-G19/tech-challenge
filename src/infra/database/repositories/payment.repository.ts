import { IPaymentRepository, PaymentStatus, SavePaymentInput, UpdatePaymentStatusInput } from '@/application/interfaces/repositories/payment.interface'
import { prismaClient } from '../prisma-client'

export class PaymentRepository implements IPaymentRepository {
  async save (input: SavePaymentInput): Promise<void> {
    await prismaClient.payment.create({
      data: {
        id: input.id,
        orderNumber: input.orderNumber,
        status: input.status as PaymentStatus,
        reason: input.reason,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt
      }
    })
  }

  async updateStatus (input: UpdatePaymentStatusInput): Promise<void> {
    await prismaClient.payment.update({
      where: {
        orderNumber: input.orderNumber
      },
      data: {
        status: input.status as PaymentStatus,
        reason: input.reason
      }
    })
  }

  async countPaymentByStatusAndOrderNumber (status: string, orderNumber: string): Promise<number> {
    return prismaClient.payment.count({
      where: {
        status: status as PaymentStatus,
        orderNumber
      }
    })
  }
}

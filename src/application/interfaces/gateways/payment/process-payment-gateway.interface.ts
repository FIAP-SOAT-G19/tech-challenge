import { OrderOutput } from '@/application/usecases/order/orders.types'
import { IUpdatePaymentStatus } from '../../usecases/payment/update-payment-status.interface'

export type ProcessPaymentInput = {
  payer: {
    name: string
    document: string
  }
  creditCard: {
    brand: string
    number: string
    cvv: string
    expiryMonth: string
    expiryYear: string
  }
  orderNumber: string
}

export interface IPaymentGateway {
  processPayment: (input: ProcessPaymentInput) => Promise<void>
  getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
  updateStatus: (input: IUpdatePaymentStatus.Input) => Promise<void>
  countPaymentByStatusAndOrderNumber: (status: string, orderNumber: string) => Promise<number>
}

import { OrderOutput } from '@/application/usecases/order/orders.types'
import { IUpdatePaymentStatus } from '../../usecases/payment/update-payment-status.interface'

export interface IUpdatePaymentGateway {
  updateStatus: (input: IUpdatePaymentStatus.Input) => Promise<void>
  getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
}

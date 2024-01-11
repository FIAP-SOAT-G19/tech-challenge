import { ProcessPaymentInput } from '../../gateways/payment/process-payment-gateway.interface'

export interface IExternalPayment {
  processPayment: (input: ProcessPaymentInput) => Promise<void>
}

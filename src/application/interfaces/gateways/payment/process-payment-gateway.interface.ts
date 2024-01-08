export type ProcessPaymentInput = {
  payer: {
    name: string
    document: string
  }
  creditCard: {
    brand: string
    number: string
    cvv: string
    expiration: string
  }
}

export type ProcessPaymentOutput = {
  status: string
  reason?: string
}

export type CreatePaymentStatusInput = {
  id: string
  orderNumber: string
  status: string
  reason: string | null
  createdAt: Date
  updatedAt: Date
}

export type UpdateOrderStatusInput = {
  orderNumber: string
  status: string
}

export interface IPaymentGateway {
  processPayment: (input: ProcessPaymentInput) => Promise<ProcessPaymentOutput>
  createPaymentStatus: (input: CreatePaymentStatusInput) => Promise<void>
  updateOrderStatus: (input: UpdateOrderStatusInput) => Promise<void>
}

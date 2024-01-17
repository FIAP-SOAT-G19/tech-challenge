import { Client, SaveOrderInput, SaveOrderProductInput, GetProductByIdOutput } from '@/application/interfaces'

export type CreatePaymentInput = {
  id: string
  orderNumber: string
  status: string
  createdAt: Date
  updatedAt: Date | null
  reason: string | null
}
export interface ICreateOrderGateway {
  getClientById: (clientId: string) => Promise<Client | null>
  saveOrder: (input: SaveOrderInput) => Promise<string>
  saveOrderProduct: (input: SaveOrderProductInput) => Promise<void>
  getProductById: (productId: string) => Promise<GetProductByIdOutput | null>
  createPayment: (input: CreatePaymentInput) => Promise<void>
}

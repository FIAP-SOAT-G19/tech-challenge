import { OrderProduct } from './order-products.types'

export type OrderOutput = {
  id: string
  orderNumber: string
  clientDocument: string | null
  clientId: string | null
  status: string
  totalValue: number
  paidAt: Date | null
  createdAt: Date
  client: Client | null
  products: OrderProduct []
} | null

export type Client = {
  name: string
  email: string
  cpf: string
}

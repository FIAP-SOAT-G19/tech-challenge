import { Product } from './products.types'

export type OrderOutput = {
  id: string
  orderNumber: string
  clientDocument: string | null
  clientId: string | null
  status: string
  totalValue: number
  paidAt: Date | null
  createdAt: Date
  client: Client
  products: Product []
} | null

export type Client = {
  name: string
  email: string
  cpf: string
}

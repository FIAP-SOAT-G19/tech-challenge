import { Client, SaveOrderInput, SaveOrderProductInput, GetProductByIdOutput } from '@/application/interfaces'

export interface ICreateOrderGateway {
  getClientById: (clientId: string) => Promise<Client | null>
  saveOrder: (input: SaveOrderInput) => Promise<string>
  saveOrderProduct: (input: SaveOrderProductInput) => Promise<void>
  getProductById: (productId: string) => Promise<GetProductByIdOutput | null>
}

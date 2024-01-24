import { GetAllOrdersInput, GetAllOrdersOutput } from '../..'

export interface IGetAllOrdersGateway {
  getAllOrders: (input: GetAllOrdersInput) => Promise<GetAllOrdersOutput>
}

import { Client, GetAllClientsInput } from '@/application/interfaces'

export interface IGetAllClientsByParamsGateway {
  getAllClientsByParams: (email: GetAllClientsInput) => Promise<Client[] | null>
}

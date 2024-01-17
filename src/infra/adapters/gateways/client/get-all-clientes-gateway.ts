import { Client, GetAllClientsInput, IClientRepository } from '@/application/interfaces'
import { IGetAllClientsByParamsGateway } from '@/application/interfaces/gateways/client/get-all-clientes-gateway.interface'

export class GetAllClientsByParamsGateway implements IGetAllClientsByParamsGateway {
  constructor(
    private readonly clientRepository: IClientRepository
  ) { }

  async getAllClientsByParams(queryOptions: GetAllClientsInput): Promise<Client[] | null> {
    return await this.clientRepository.getAll(queryOptions)
  }
}

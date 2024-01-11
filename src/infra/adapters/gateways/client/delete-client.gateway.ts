import { Client, IClientRepository } from '@/application/interfaces'
import { IDeleteClientGateway } from '@/application/interfaces/gateways/client/delete-client-gateway.interface'

export class DeleteClientGateway implements IDeleteClientGateway {
  constructor(
    private readonly clientRepository: IClientRepository
  ) { }

  async getClientById(clientId: string): Promise<Client | null> {
    return await this.clientRepository.getById(clientId)
  }

  async deleteClient(clientId: string): Promise<void> {
    await this.clientRepository.delete(clientId)
  }
}

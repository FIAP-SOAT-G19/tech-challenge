import { Client, IClientRepository, IUpdateClientGateway, UpdateClientInput } from '@/application/interfaces'

export class UpdateClientGateway implements IUpdateClientGateway {
  constructor(
    private readonly clientRepository: IClientRepository
  ) { }

  async getClientById(clientId: string): Promise<Client | null> {
    return await this.clientRepository.getById(clientId)
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    return await this.clientRepository.getByEmail(email)
  }

  async getClientByDocument(document: string): Promise<Client | null> {
    return await this.clientRepository.getByDocument(document)
  }

  async updateClient(input: UpdateClientInput): Promise<string> {
    return await this.clientRepository.update(input)
  }
}

import { Client, IClientRepository, ICreateClientGateway, SaveClientInput } from '@/application/interfaces'

export class CreateClientGateway implements ICreateClientGateway {
  constructor(
    private readonly clientRepository: IClientRepository
  ) { }

  async getClientByEmail(email: string): Promise<Client | null> {
    return await this.clientRepository.getByEmail(email)
  }

  async getClientByDocument(document: string): Promise<Client | null> {
    return await this.clientRepository.getByDocument(document)
  }

  async saveClient(input: SaveClientInput): Promise<string> {
    return await this.clientRepository.save(input)
  }
}

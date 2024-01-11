import { Client, IClientRepository } from '@/application/interfaces'
import { ILoginClientGateway } from '@/application/interfaces/gateways/client/login-client-gateway.interface'

export class LoginClientGateway implements ILoginClientGateway {
  constructor(
    private readonly clientRepository: IClientRepository
  ) { }

  async getClientByEmail(email: string): Promise<Client | null> {
    return await this.clientRepository.getByEmail(email)
  }
}

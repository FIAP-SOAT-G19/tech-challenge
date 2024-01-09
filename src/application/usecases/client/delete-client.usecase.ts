import { IDeleteClientGateway } from '@/application/interfaces/gateways/client/delete-client-gateway.interface'
import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { ClientNotFoundError } from '@/infra/shared'

export class DeleteClientUseCase implements IDeleteClientUseCase {
  constructor(private readonly gateway: IDeleteClientGateway) { }

  async execute(input: IDeleteClientUseCase.Input): Promise<void> {
    await this.validate(input)
    await this.gateway.deleteClient(input.id)
  }

  private async validate(input: IDeleteClientUseCase.Input): Promise<void> {
    const client = await this.gateway.getClientById(input.id)
    if (!client) throw new ClientNotFoundError()
  }
}

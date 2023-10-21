import { IGetClientById } from '@/ports/usecases/client/get-client-by-id.port'
import { ClientNotFoundError } from '@/shared/errors'
import { IClientRepository } from '@/ports'

export class GetClientByIdUseCase implements IGetClientById {
  constructor(private readonly clientRepository: IClientRepository) { }

  async execute(input: IGetClientById.Input): Promise<IGetClientById.Output> {
    const client = await this.clientRepository.getById(input.id)
    if (!client) throw new ClientNotFoundError()
    return client
  }
}

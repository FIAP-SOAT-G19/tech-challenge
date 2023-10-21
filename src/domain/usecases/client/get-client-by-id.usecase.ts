import { IGetClientByIdUseCase } from '@/ports/usecases/client/get-client-by-id.port'
import { ClientNotFoundError } from '@/shared/errors'
import { IClientRepository } from '@/ports'

export class GetClientByIdUseCase implements IGetClientByIdUseCase {
  constructor(private readonly clientRepository: IClientRepository) { }

  async execute(input: IGetClientByIdUseCase.Input): Promise<IGetClientByIdUseCase.Output> {
    const client = await this.clientRepository.getById(input.id)
    if (!client) throw new ClientNotFoundError()
    return client
  }
}

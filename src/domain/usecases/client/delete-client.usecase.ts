import { IClientRepository } from '@/ports'
import { IDeleteClientUseCase } from '@/ports/usecases/client/delete-client.port'
import { ClientNotFoundError } from '@/shared/errors'

export class DeleteClientUseCase implements IDeleteClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) { }

  async execute(input: IDeleteClientUseCase.Input): Promise<IDeleteClientUseCase.Output> {
    await this.validate(input)
    return await this.clientRepository.delete(input.id)
  }

  private async validate(input: IDeleteClientUseCase.Input): Promise<void> {
    const client = await this.clientRepository.getById(input.id)
    if (!client) throw new ClientNotFoundError()
  }
}

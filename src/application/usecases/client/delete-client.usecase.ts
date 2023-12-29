import { IClientRepository } from '@/application/interfaces'
import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { ClientNotFoundError } from '@/infra/shared'

export class DeleteClientUseCase implements IDeleteClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) { }

  async execute(input: IDeleteClientUseCase.Input): Promise<void> {
    await this.validate(input)
    await this.clientRepository.delete(input.id)
  }

  private async validate(input: IDeleteClientUseCase.Input): Promise<void> {
    const client = await this.clientRepository.getById(input.id)
    if (!client) throw new ClientNotFoundError()
  }
}

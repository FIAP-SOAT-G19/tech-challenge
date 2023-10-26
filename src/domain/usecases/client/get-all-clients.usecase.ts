import { IGetAllClientsUseCase } from '@/ports/usecases/client/get-all-clients.port'
import { ClientNotFoundError } from '@/shared/errors'
import { IClientRepository } from '@/ports'

export class GetAllClientsUseCase implements IGetAllClientsUseCase {
  constructor(private readonly clientRepository: IClientRepository) { }

  async execute(input: IGetAllClientsUseCase.Input): Promise<IGetAllClientsUseCase.Output[]> {
    const queryOptions = this.makeQueryOptions(input)
    const clients = await this.clientRepository.getAll(queryOptions)
    if (!clients || clients.length === 0) throw new ClientNotFoundError()
    return clients
  }

  private makeQueryOptions(input: IGetAllClientsUseCase.Input): IGetAllClientsUseCase.Input {
    const options: IGetAllClientsUseCase.Input = {}
    if (input.id) options.id = input.id
    if (input.email) options.email = input.email
    if (input.cpf) options.cpf = input.cpf
    return options
  }
}

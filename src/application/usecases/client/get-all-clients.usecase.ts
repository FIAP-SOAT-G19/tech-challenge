import { IClientRepository } from '@/application/interfaces'
import { IGetAllClientsUseCase } from '@/application/interfaces/usecases/client/get-all-clients.interface'
import { ClientNotFoundError } from '@/infra/shared'

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

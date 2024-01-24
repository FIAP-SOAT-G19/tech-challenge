import { IGetAllClientsByParamsGateway } from '@/application/interfaces/gateways/client/get-all-clientes-gateway.interface'
import { IGetAllClientsUseCase } from '@/application/interfaces/usecases/client/get-all-clients.interface'
import { ClientNotFoundError } from '@/infra/shared'

export class GetAllClientsUseCase implements IGetAllClientsUseCase {
  constructor(private readonly gateway: IGetAllClientsByParamsGateway) { }

  async execute(input: IGetAllClientsUseCase.Input): Promise<IGetAllClientsUseCase.Output[]> {
    const queryOptions = this.makeQueryOptions(input)
    const clients = await this.gateway.getAllClientsByParams(queryOptions)
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

import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { DeleteClientUseCase } from '@/application/usecases/client/delete-client.usecase'
import { DeleteClientGateway } from '@/infra/adapters/gateways/client/delete-client.gateway'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeDeleteClientUseCase = (): IDeleteClientUseCase => {
  const gateway = new DeleteClientGateway(new ClientRepository())
  return new DeleteClientUseCase(gateway)
}

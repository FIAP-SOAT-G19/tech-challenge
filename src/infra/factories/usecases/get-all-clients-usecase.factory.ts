import { GetAllClientsUseCase } from '@/domain/usecases/client/get-all-clients.usecase'
import { ClientRepository } from '@/infra/database/repositories/client.repository'
import { IGetAllClientsUseCase } from '@/ports/usecases/client/get-all-clients.port'

const clientRepository = new ClientRepository()

export const makeGetAllClientsUseCase = (): IGetAllClientsUseCase => {
  return new GetAllClientsUseCase(clientRepository)
}

import { IGetAllClientsUseCase } from '@/application/interfaces/usecases/client/get-all-clients.interface'
import { GetAllClientsUseCase } from '@/application/usecases/client/get-all-clients.usecase'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

const clientRepository = new ClientRepository()

export const makeGetAllClientsUseCase = (): IGetAllClientsUseCase => {
  return new GetAllClientsUseCase(clientRepository)
}

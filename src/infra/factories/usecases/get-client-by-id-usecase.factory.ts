import { GetClientByIdUseCase } from '@/domain/usecases/client/get-client-by-id.usecase'
import { ClientRepository } from '@/infra/database/repositories/client.repository'
import { IGetClientByIdUseCase } from '@/ports/usecases/client/get-client-by-id.port'

const clientRepository = new ClientRepository()

export const makeGetClientByIdUseCase = (): IGetClientByIdUseCase => {
  return new GetClientByIdUseCase(clientRepository)
}

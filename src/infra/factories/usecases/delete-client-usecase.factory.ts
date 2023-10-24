import { DeleteClientUseCase } from '@/domain/usecases/client/delete-client.usecase'
import { ClientRepository } from '@/infra/database/repositories/client.repository'
import { IDeleteClientUseCase } from '@/ports/usecases/client/delete-client.port'

const clientRepository = new ClientRepository()

export const makeDeleteClientUseCase = (): IDeleteClientUseCase => {
  return new DeleteClientUseCase(clientRepository)
}

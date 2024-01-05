import { IDeleteClientUseCase } from '@/application/interfaces/usecases/client/delete-client.interface'
import { DeleteClientUseCase } from '@/application/usecases/client/delete-client.usecase'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

const clientRepository = new ClientRepository()

export const makeDeleteClientUseCase = (): IDeleteClientUseCase => {
  return new DeleteClientUseCase(clientRepository)
}

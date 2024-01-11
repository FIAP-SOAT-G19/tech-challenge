import { DeleteClientController } from '@/infra/adapters/controllers/client/delete-client.controller'
import { makeDeleteClientUseCase } from '@/infra/factories/usecases/client/delete-client-usecase.factory'

export const makeDeleteClientController = (): DeleteClientController => {
  return new DeleteClientController(makeDeleteClientUseCase())
}

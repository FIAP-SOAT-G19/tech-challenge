import { DeleteClientController } from '@/infra/adapters/controllers/client/delete-client.controller'
import { makeDeleteClientUseCase } from '../usecases/delete-client-usecase.factory'

export const makeDeleteClientController = (): DeleteClientController => {
  return new DeleteClientController(makeDeleteClientUseCase())
}

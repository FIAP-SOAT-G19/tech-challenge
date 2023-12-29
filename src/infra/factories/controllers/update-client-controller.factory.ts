import { UpdateClientController } from '@/infra/adapters/controllers/client/update-client.controller'
import { makeUpdateClientUseCase } from '@/infra/factories/usecases/update-client-usecase.factory'

export const makeUpdateClientController = (): UpdateClientController => {
  return new UpdateClientController(makeUpdateClientUseCase())
}

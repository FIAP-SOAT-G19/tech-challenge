import { UpdateClientController } from '@/application/controllers/client/update-client.controller'
import { makeUpdateClientUseCase } from '../usecases/update-client-usecase.factory'

export const makeUpdateClientController = (): UpdateClientController => {
  return new UpdateClientController(makeUpdateClientUseCase())
}
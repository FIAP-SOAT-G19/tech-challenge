import { CreateClientController } from '../../../application/controllers/client/create-client.controller'
import { makeCreateClientUseCase } from '../usecases/create-client-usecase.factory'

export const makeCreateClientController = (): CreateClientController => {
  return new CreateClientController(makeCreateClientUseCase())
}

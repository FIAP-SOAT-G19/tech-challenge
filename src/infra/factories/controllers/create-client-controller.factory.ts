
import { CreateClientController } from '@/infra/adapters/controllers/client/create-client.controller'
import { makeCreateClientUseCase } from '@/infra/factories/usecases/create-client-usecase.factory'

export const makeCreateClientController = (): CreateClientController => {
  return new CreateClientController(makeCreateClientUseCase())
}

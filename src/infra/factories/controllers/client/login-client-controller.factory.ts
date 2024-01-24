import { LoginClientController } from '@/infra/adapters/controllers/client/login-client.controller'
import { makeLoginClientUseCase } from '@/infra/factories/usecases/client/login-client-usecase.factory'

export const makeLoginClientController = (): LoginClientController => {
  return new LoginClientController(makeLoginClientUseCase())
}

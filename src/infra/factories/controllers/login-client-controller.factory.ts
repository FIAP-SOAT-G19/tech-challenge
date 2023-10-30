import { LoginClientController } from '@/application/controllers/client/login-client.controller'
import { makeLoginClientUseCase } from '../usecases/login-client-usecase.factory'

export const makeLoginClientController = (): LoginClientController => {
  return new LoginClientController(makeLoginClientUseCase())
}

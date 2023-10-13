import { IdentifyClientByCpfController } from '../../../application/controllers/clients/identify-client-by-cpf.controller'
import { makeCreateOrderUseCase } from '../usecases/identify-client-by-cpf-usecase.factory'

export const makeIdentifyClientByCpfController = (): IdentifyClientByCpfController => {
  return new IdentifyClientByCpfController(makeCreateOrderUseCase())
}

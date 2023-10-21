import { GetClientByIdController } from '@/application/controllers/client/get-client-by-id.controller'
import { makeGetClientByIdUseCase } from '../usecases/get-client-by-id-usecase.factory'

export const makeGetClientByIdController = (): GetClientByIdController => {
  return new GetClientByIdController(makeGetClientByIdUseCase())
}

import { GetAllClientsController } from '@/infra/adapters/controllers/client/get-all-clients.controller'
import { makeGetAllClientsUseCase } from '@/infra/factories/usecases/client/get-all-clients-usecase.factory'

export const makeGetAllClientsController = (): GetAllClientsController => {
  return new GetAllClientsController(makeGetAllClientsUseCase())
}

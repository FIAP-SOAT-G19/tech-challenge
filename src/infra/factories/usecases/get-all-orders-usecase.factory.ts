import { GetAllOrdersUseCase } from '@/application/usecases/order/get-all-orders.usecase'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'
import { GetAllOrdersGateway } from '@/infra/adapters/gateways/order/get-all-orders.gateway'
import { GetAllOrdersPresenter } from '@/infra/adapters/presenters/order/get-all-orders.presenter'

export const makeGetAllOrdersUseCase = (): GetAllOrdersUseCase => {
  const gateway = new GetAllOrdersGateway(new OrderRepository())
  const presenter = new GetAllOrdersPresenter()
  
  return new GetAllOrdersUseCase(
    gateway, 
    presenter
  )
}

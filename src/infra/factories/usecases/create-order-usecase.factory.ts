import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { CreateOrderUseCase } from '../../../domain/usecases/order/create-order.usecase'
import { UUIDGeneratorAdapter } from '../../../infra/adapters/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '../../../infra/adapters/validation/joi-validator.adapter'
import { ClientRepository } from '../../../infra/database/repositories/client.repository'
import { OrderProductRepository } from '../../../infra/database/repositories/order-product.repository'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'

export const makeCreateOrderUseCase = (): CreateOrderUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const clientRepository = new ClientRepository()
  const orderRepository = new OrderRepository()
  const orderProductRepository = new OrderProductRepository()
  const productOrder = new ProductRepository()

  return new CreateOrderUseCase(
    schemaValidator,
    uuidGenerator,
    clientRepository,
    orderRepository,
    orderProductRepository,
    productOrder
  )
}

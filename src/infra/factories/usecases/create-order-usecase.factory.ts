import { ProductRepository } from '../../../infra/database/repositories/product.repository'
import { ClientRepository } from '../../../infra/database/repositories/client.repository'
import { OrderProductRepository } from '../../../infra/database/repositories/order-product.repository'
import { OrderRepository } from '../../../infra/database/repositories/order.repository'
import { CreateOrderUseCase } from '@/application/usecases/order/create-order.usecase'
import { UUIDGeneratorAdapter } from '@/infra/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/infra/adapters/tools/validation/joi-validator.adapter'
import { CreateOrderGateway } from '@/infra/adapters/gateways/order/create-order.gateway'
import { PaymentRepository } from '@/infra/database/repositories/payment.repository'

export const makeCreateOrderUseCase = (): CreateOrderUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const gateway = new CreateOrderGateway(
    new ClientRepository(),
    new OrderRepository(),
    new OrderProductRepository(),
    new ProductRepository(),
    new PaymentRepository()
  )

  return new CreateOrderUseCase(
    schemaValidator,
    uuidGenerator,
    gateway
  )
}

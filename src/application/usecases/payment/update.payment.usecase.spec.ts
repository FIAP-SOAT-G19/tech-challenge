import { IUpdatePaymentStatus } from '@/application/interfaces/usecases/payment/update-payment-status.interface'
import { UpdatePaymentStatusUseCase } from './update.payment.usecase'
import { mock } from 'jest-mock-extended'
import { IUpdatePaymentGateway } from '@/application/interfaces/gateways/payment/update-payment-gateway.interface'
import { OrderOutput } from '../order/orders.types'
import { InvalidParamError } from '@/infra/shared'

const gateway = mock<IUpdatePaymentGateway>()
const orderOutput: OrderOutput = {
  id: 'anyOrderId',
  orderNumber: 'anyOrderNumber',
  clientId: 'anyClientId',
  clientDocument: null,
  status: 'waitingPayment',
  totalValue: 4500,
  createdAt: new Date('2023-10-12 16:55:27'),
  paidAt: new Date('2023-10-12 17:13:26'),
  client: {
    name: 'anyClientName',
    email: 'anyClientEmail',
    cpf: 'anyClientCpf'
  },
  products: [{
    id: 'anyProductId',
    name: 'anyProductName',
    category: 'anyCategoryProduct',
    price: 1700,
    description: 'anyDescriptionProduct',
    image: 'anyImageProduct',
    amount: 3
  }]
}

describe('UpdatePaymentStatusUseCase', () => {
  let sut: UpdatePaymentStatusUseCase
  let input: IUpdatePaymentStatus.Input

  beforeEach(() => {
    sut = new UpdatePaymentStatusUseCase(gateway)
    input = {
      orderNumber: 'anyOrderNumber',
      status: 'approved',
      reason: null
    }

    gateway.getByOrderNumber.mockResolvedValue(orderOutput)
  })

  test('should call gateway.getByOrderNumber once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(gateway.getByOrderNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getByOrderNumber).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should throws if gateway.getByOrderNumber returns null', async () => {
    gateway.getByOrderNumber.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('orderNumber'))
  })

  test('should throws if an invalid status is provided', async () => {
    input.status = 'InvalidStatus'

    const output = sut.execute(input)

    await expect(output).rejects.toThrowError(new InvalidParamError('status'))
  })

  test('should  call gateway.updateStatus once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.updateStatus).toHaveBeenCalledTimes(1)
    expect(gateway.updateStatus).toHaveBeenCalledWith({
      orderNumber: 'anyOrderNumber',
      status: 'approved',
      reason: null
    })
  })
})

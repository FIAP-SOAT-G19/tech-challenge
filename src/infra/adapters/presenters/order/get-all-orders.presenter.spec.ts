import { OrderStatus } from '@/application/interfaces'
import { GetAllOrdersPresenter } from './get-all-orders.presenter'
import { OrderOutput } from '@/application/usecases/order/orders.types'

const defaultOrderInput: OrderOutput = {
    id: 'anyId',
    orderNumber: 'anyOrderNumber',
    clientDocument: 'anyDocument',
    clientId: 'anyClientId',
    status: 'prepared',
    totalValue: 10000,
    paidAt: new Date(),
    createdAt: new Date(),
    products: [{
        id: 'anyProductId',
        name: 'AnyProductName',
        category: 'anyProductCategory',
        price: 2500,
        description: 'anyProductDescription',
        image: 'anyProductImageUrl',
        amount: 1
    }, {
        id: 'anyAnotherProductId',
        name: 'AnyAnotherProductName',
        category: 'anyAnotherProductCategory',
        price: 1000,
        description: 'anyAnotherProductDescription',
        image: 'anyAnotherProductImageUrl',
        amount: 1
    }],
    client: {
        name: 'anyClientName',
        email: 'anyClientEmail',
        cpf: 'anyClientCpf'
    }
}

describe('GetAllOrdersPresenter', () => {
  let sut: GetAllOrdersPresenter

  beforeAll(() => {
    sut = new GetAllOrdersPresenter()
  })

  test('should create ordenation for orders by status following the rule: prepared - inPreparation - received if there are any', async () => {
    const orderInput: OrderOutput[] = [{
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION
    }]
    
    const output = await sut.createOrdenation(orderInput)

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.PREPARED
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED
    }])
  })

  test('should create ordenation for orders by status following the rule: prepared - inPreparation - received, and by paidAt date', async () => {
    const orderInput: OrderOutput[] = [{
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        paidAt: new Date('2024-01-11T15:31:05.166Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        paidAt: new Date('2024-01-11T15:31:05.168Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        paidAt: new Date('2024-01-11T15:31:05.164Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.169Z')
    }]
    
    const output = await sut.createOrdenation(orderInput)

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        paidAt: new Date('2024-01-11T15:31:05.164Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.PREPARED,
        paidAt: new Date('2024-01-11T15:31:05.168Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.169Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.RECEIVED,
        paidAt: new Date('2024-01-11T15:31:05.166Z')
    }])
  })

  test('should create ordenation for orders by status following the rule: prepared - inPreparation - received, and by paidAt date', async () => {
    const orderInput: OrderOutput[] = [{
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.166Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.164Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.165Z')
    }]
    
    const output = await sut.createOrdenation(orderInput)

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.164Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.165Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.IN_PREPARATION,
        paidAt: new Date('2024-01-11T15:31:05.166Z')
    }])
  })

  test('should create ordenation by paidAt date if there are other status', async () => {
    const orderInput: OrderOutput[] = [{
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        paidAt: new Date('2024-01-11T15:31:05.166Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        paidAt: new Date('2024-01-11T15:31:05.164Z')
    }]
    
    const output = await sut.createOrdenation(orderInput)

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        paidAt: new Date('2024-01-11T15:31:05.164Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.FINALIZED,
        paidAt: new Date('2024-01-11T15:31:05.166Z')
    }])
  })

  test('should create ordenation by createdAt date if there isnt a paidAt date', async () => {
    const orderInput: OrderOutput[] = [{
        ...defaultOrderInput,
        status: OrderStatus.WAITING_PAYMENT,
        paidAt: null,
        createdAt: new Date('2024-01-11T15:31:05.166Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.WAITING_PAYMENT,
        paidAt: null,
        createdAt: new Date('2024-01-11T15:31:05.164Z')
    }]
    
    const output = await sut.createOrdenation(orderInput)

    expect(output).toEqual([{
        ...defaultOrderInput,
        status: OrderStatus.WAITING_PAYMENT,
        paidAt: null,
        createdAt: new Date('2024-01-11T15:31:05.164Z')
    }, {
        ...defaultOrderInput,
        status: OrderStatus.WAITING_PAYMENT,
        paidAt: null,
        createdAt: new Date('2024-01-11T15:31:05.166Z')
    }])
  })

  test('should return null if input is null, udefined or empty', async () => {
    const output1 = await sut.createOrdenation(null)
    expect(output1).toEqual(null)

    const output2 = await sut.createOrdenation(undefined as any)
    expect(output2).toEqual(null)

    const output3 = await sut.createOrdenation([])
    expect(output3).toEqual(null)
  })


})

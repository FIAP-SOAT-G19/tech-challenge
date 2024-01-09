import { DeleteEmployeeUseCase } from './delete-employee.usecase'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { IDeleteEmployeeGateway } from '@/application/interfaces'

const gateway = mock<IDeleteEmployeeGateway>()

describe('DeleteEmployeeUseCase', () => {
  let sut: DeleteEmployeeUseCase
  let input: any

  beforeEach(() => {
    sut = new DeleteEmployeeUseCase(gateway)
    input = {
      id: 'anyId'
    }
    gateway.findById.mockResolvedValue({
      id: 'anyId',
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should delete employee', async () => {
    gateway.delete.mockResolvedValue(undefined)

    await sut.execute(input)

    expect(gateway.delete).toHaveBeenCalledWith({
      id: 'anyId',
      name: 'John Doe',
      email: 'john@email.com',
      cpf: '1234567890',
      password: 'password123',
      createdAt: new Date('2021-09-21T22:00:00.000Z'),
      updatedAt: new Date('2021-09-21T22:00:00.000Z'),
      deletedAt: new Date('9999-12-31T23:59:59.999Z')
    })
  })
})

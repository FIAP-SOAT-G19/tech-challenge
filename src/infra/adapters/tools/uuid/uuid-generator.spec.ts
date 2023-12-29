import { UUIDGeneratorAdapter } from './uuid-generator'
import { randomUUID } from 'crypto'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('anyUUID')
}))

describe('UUIDGeneratorAdapter', () => {
  let sut: UUIDGeneratorAdapter

  beforeAll(() => {
    sut = new UUIDGeneratorAdapter()
  })
  test('should call randomUUID once', () => {
    sut.generate()

    expect(randomUUID).toHaveBeenCalledTimes(1)
  })

  test('should return a correct UUID', () => {
    const uuid = sut.generate()

    expect(uuid).toBe('anyUUID')
  })
})

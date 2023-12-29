import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt.adapter'

describe('BcryptAdapter', () => {
  let sut: IEncrypt

  beforeEach(() => {
    sut = new BcryptAdapter()
  })

  test('should return hash once input value', () => {
    const hash = sut.encrypt('anyValue')
    expect(hash).toBeTruthy()
  })

  test('should return correctly hash', () => {
    const hash = sut.encrypt('anyValue')
    const hashCompare = bcrypt.compareSync('anyValue', hash)
    expect(hashCompare).toBeTruthy()
  })

  test('should compare values', async () => {
    const value = 'anyValue'
    const valueToCompare = sut.encrypt('anyValue')
    const output = await sut.compare(value, valueToCompare)
    expect(output).toBeTruthy()
  })
  test('should compare values', async () => {
    const value = 'otherAnyValue'
    const valueToCompare = sut.encrypt('anyValue')
    const output = await sut.compare(value, valueToCompare)
    expect(output).toBeFalsy()
  })
})

import { IEncrypt } from '@/ports/usecases/encrypt/encrypt.port'
import { BcryptAdapter } from '@/infra/adapters/encrypt/bcrypt.adapter'
import bcrypt from 'bcrypt'

describe('BcryptAdapter', () => {
  let sut: IEncrypt

  beforeEach(() => {
    sut = new BcryptAdapter()
  })

  test('should return hash once input value', () => {
    const hash = sut.encrypt('anyValue')
    expect(hash).toBeTruthy()
  })

  test('should returna correctly hash', () => {
    const hash = sut.encrypt('anyValue')
    const hashCompare = bcrypt.compareSync('anyValue', hash)
    expect(hashCompare).toBeTruthy()
  })
})

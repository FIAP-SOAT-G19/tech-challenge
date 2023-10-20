import { EncryptoPasswordGenerator } from './encrypt-password-generator'
import { IEncryptoPasswordGenerator } from './../../../ports/usecases/encrypto-password/encrypto-password.port'
import bcrypt from 'bcrypt'

describe('EncryptoPasswordGenerator', () => {
  let encryptoPasswordGenerator: IEncryptoPasswordGenerator

  beforeEach(() => {
    encryptoPasswordGenerator = new EncryptoPasswordGenerator()
  })

  test('should generate a password hash', () => {
    const password = 'mypassword123'

    const saltRounds = 10
    const generatedSalt = 'mockedSalt'
    const generatedHash = 'mockedHash'

    bcrypt.genSaltSync = jest.fn().mockReturnValue(generatedSalt)
    bcrypt.hashSync = jest.fn().mockReturnValue(generatedHash)

    const result = encryptoPasswordGenerator.generate(password)

    expect(result).toBe(generatedHash)
    expect(bcrypt.genSaltSync).toHaveBeenCalledWith(saltRounds)
    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, generatedSalt)
  })
})

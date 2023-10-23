import { IEncryptoPasswordGenerator } from './../../../ports/usecases/encrypto-password/encrypto-password.port'
import bcrypt from 'bcrypt'

export class EncryptoPasswordGenerator implements IEncryptoPasswordGenerator {
  generate (password: string): string {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
  }
}

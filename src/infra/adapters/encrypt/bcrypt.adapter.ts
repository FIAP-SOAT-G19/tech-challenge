import { IEncrypt } from '@/ports/usecases/encrypt/encrypt.port'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypt {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 2)
  }
}

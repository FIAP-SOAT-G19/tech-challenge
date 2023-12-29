
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypt {
  encrypt(value: string): string {
    return bcrypt.hashSync(value, 2)
  }

  async compare(value: string, valueToCompare: string): Promise<boolean> {
    return await bcrypt.compare(value, valueToCompare)
  }
}

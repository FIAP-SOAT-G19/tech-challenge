import { IUUIDGenerator } from '@/ports'
import { randomUUID } from 'crypto'

export class UUIDGeneratorAdapter implements IUUIDGenerator {
  generate (): string {
    return randomUUID()
  }
}

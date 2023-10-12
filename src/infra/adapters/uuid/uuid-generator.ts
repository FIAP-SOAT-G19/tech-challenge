
import { IUUIDGenerator } from '@/ports/usecases/uuid/uuid-generator.port'
import { randomUUID } from 'crypto'

export class UUIDGeneratorAdapter implements IUUIDGenerator {
  generate (): string {
    return randomUUID()
  }
}

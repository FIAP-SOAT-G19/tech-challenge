import { LoginClientUseCase } from '@/domain/usecases/client/login-client.usecase'
import { BcryptAdapter } from '@/infra/adapters/encrypt/bcrypt.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'
import { ILoginClientUseCase } from '@/ports/usecases/client/login-client.port'

export const makeLoginClientUseCase = (): ILoginClientUseCase => {
  const clientRepository = new ClientRepository()
  const encrypt = new BcryptAdapter()
  return new LoginClientUseCase(clientRepository, encrypt)
}

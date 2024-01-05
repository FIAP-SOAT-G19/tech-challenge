
import { ILoginClientUseCase } from '@/application/interfaces/usecases/client/login-client.interface'
import { LoginClientUseCase } from '@/application/usecases/client/login-client.usecase'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeLoginClientUseCase = (): ILoginClientUseCase => {
  const clientRepository = new ClientRepository()
  const encrypt = new BcryptAdapter()
  return new LoginClientUseCase(clientRepository, encrypt)
}

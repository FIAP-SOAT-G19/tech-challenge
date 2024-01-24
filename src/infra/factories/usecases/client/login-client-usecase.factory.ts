import { ILoginClientUseCase } from '@/application/interfaces/usecases/client/login-client.interface'
import { LoginClientUseCase } from '@/application/usecases/client/login-client.usecase'
import { LoginClientGateway } from '@/infra/adapters/gateways/client/login-client-gateway'
import { BcryptAdapter } from '@/infra/adapters/tools/encrypt/bcrypt.adapter'
import { ClientRepository } from '@/infra/database/repositories/client.repository'

export const makeLoginClientUseCase = (): ILoginClientUseCase => {
  const gateway = new LoginClientGateway(new ClientRepository())
  const encrypt = new BcryptAdapter()
  return new LoginClientUseCase(gateway, encrypt)
}

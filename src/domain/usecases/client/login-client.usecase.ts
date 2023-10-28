import { IClientRepository } from '@/ports'
import { ILoginClientUseCase } from '@/ports/usecases/client/login-client.port'
import { IEncrypt } from '@/ports/usecases/encrypt/encrypt.port'
import { InvalidParamError } from '@/shared'

export class LoginClientUseCase implements ILoginClientUseCase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly encrypt: IEncrypt
  ) { }

  async execute(input: ILoginClientUseCase.Input): Promise<ILoginClientUseCase.Output> {
    const client = await this.clientRepository.getByEmail(input.email)
    if (!client) {
      throw new InvalidParamError('email or password is incorrect')
    }
    const passwordCompare = this.encrypt.compare(input.password, client.password)
    if (!passwordCompare) {
      throw new InvalidParamError('email or password is incorrect')
    }

    return client
  }
}

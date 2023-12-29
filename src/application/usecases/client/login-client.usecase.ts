import { IClientRepository } from '@/application/interfaces'
import { ILoginClientUseCase } from '@/application/interfaces/usecases/client/login-client.interface'
import { IEncrypt } from '@/application/interfaces/usecases/encrypt/encrypt.interface'
import { InvalidParamError } from '@/infra/shared'

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
    const passwordCompare = await this.encrypt.compare(input.password, client.password)
    if (!passwordCompare) {
      throw new InvalidParamError('email or password is incorrect')
    }

    return { name: client.name, email: client.email, cpf: client.cpf }
  }
}

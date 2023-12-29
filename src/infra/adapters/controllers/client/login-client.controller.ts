import { IController } from '@/application/interfaces'
import { ILoginClientUseCase } from '@/application/interfaces/usecases/client/login-client.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'

export class LoginClientController implements IController {
  constructor(private readonly loginClientUseCase: ILoginClientUseCase) { }
  async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      const client = await this.loginClientUseCase.execute({ ...input.body })
      return success(200, { ...client })
    } catch (error) {
      return handleError(error as Error)
    }
  }
}

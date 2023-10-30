import { IController } from '@/ports'
import { ILoginClientUseCase } from '@/ports/usecases/client/login-client.port'
import { HttpRequest, HttpResponse, handleError, success } from '@/shared'

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


import { IController } from '@/application/interfaces'
import { HttpRequest, HttpResponse } from '@/infra/shared'

export class ReadinessController implements IController {
  async execute(input: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, body: { status: 'OK' } }
  }
}

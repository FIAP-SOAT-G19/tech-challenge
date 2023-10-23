import { IController } from '@/ports/controllers/index.port'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class HealthCheckController implements IController {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: { status: 'OK' }
    }
  }
}

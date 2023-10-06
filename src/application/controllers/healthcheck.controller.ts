import { ControllerInterface } from '@/infra/adapters/ports/controller'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class HealthCheckController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: { status: 'OK' }
    }
  }
}

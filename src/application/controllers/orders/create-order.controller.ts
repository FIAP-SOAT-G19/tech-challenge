import { IController } from '@/ports/controllers/index.port'
import { success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class CreateOrderController implements IController {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    return success(200, {})
  }
}

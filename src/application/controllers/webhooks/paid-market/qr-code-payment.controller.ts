import { IController } from '@/ports'
import { success } from '../../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../../shared/types/http.types'
import { IUpdateOrderStatusUseCase } from '@/ports/usecases/order/update-oder-status.port'
import constants from '../../../../shared/constants'
import { handleError } from '../../../../shared/errors/handle-error'

export class QrCodePaymentController implements IController {
  constructor(private readonly updateOrderStatusUseCase: IUpdateOrderStatusUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const status = input.body.status === constants.PAID_MARKET.STATUS_APPROVED ? 'received' : 'canceled'
      await this.updateOrderStatusUseCase.execute({ orderNumber: input.body.orderNumber, status })
      return success(204, null)
    } catch (error: any) {
      return handleError(error)
    }
  }
}

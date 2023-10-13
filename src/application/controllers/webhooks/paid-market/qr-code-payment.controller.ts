import { IController } from '@/ports'
import { serverError, success } from '../../../../shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '../../../../shared/types/http.types'
import { IUpdateOrderStatus } from '@/ports/usecases/order/update-oder-status.port'
import constants from '../../../../shared/constants'

export class QrCodePaymentController implements IController {
  constructor(private readonly updateOrderStatusUseCase: IUpdateOrderStatus) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const status = input.body.status === constants.PAID_MARKET.STATUS_APPROVED ? 'received' : 'canceled'
      await this.updateOrderStatusUseCase.execute({ orderNumber: input.body.orderNumber, status })
      return success(200, {})
    } catch (error: any) {
      return serverError(error)
    }
  }
}

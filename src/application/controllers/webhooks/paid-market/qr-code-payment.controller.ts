import { IController, IUpdateOrderStatusUseCase } from '@/ports'
import { success, HttpRequest, HttpResponse, handleError } from '@/shared'
import constants from '@/shared/constants'

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

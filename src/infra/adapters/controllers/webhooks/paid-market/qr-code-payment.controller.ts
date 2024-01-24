import { IController, IUpdateOrderStatusUseCase } from '@/application/interfaces'
import { IUpdatePaymentStatus } from '@/application/interfaces/usecases/payment/update-payment-status.interface'
import { HttpRequest, HttpResponse, success, handleError } from '@/infra/shared'
import constants from '@/infra/shared/constants'

export class QrCodePaymentController implements IController {
  constructor(
    private readonly updateOrderStatusUseCase: IUpdateOrderStatusUseCase,
    private readonly updatePaymentStatusUseCase: IUpdatePaymentStatus
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.updateOrderStatusUseCase.execute({
        orderNumber: input.body.orderNumber,
        status: input.body.status === constants.PAYMENT_STATUS.APPROVED ? 'received' : 'canceled'
      })

      await this.updatePaymentStatusUseCase.execute({
        orderNumber: input.body.orderNumber,
        status: input.body.status,
        reason: input.body.reason ?? null
      })

      return success(204, null)
    } catch (error: any) {
      return handleError(error)
    }
  }
}

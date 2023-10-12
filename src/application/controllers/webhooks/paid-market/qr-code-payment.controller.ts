import { IController } from '@/ports'
import { IHandleProcessedPayment } from '@/ports/usecases/payment/handle-processed-payment.port'
import { serverError, success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class QrCodePaymentController implements IController {
  constructor(private readonly handleProcessedPaymentUseCase: IHandleProcessedPayment) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.handleProcessedPaymentUseCase.execute(input.body)
      return success(200, {})
    } catch (error: any) {
      return serverError(error)
    }
  }
}

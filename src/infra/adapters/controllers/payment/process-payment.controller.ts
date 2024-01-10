import { IController } from '@/application/interfaces'
import { IProcessPaymentUseCase } from '@/application/interfaces/usecases/payment/process-payment.interface'
import { HttpRequest, HttpResponse, handleError, success } from '@/infra/shared'

export class ProcessPaymentController implements IController {
  constructor(private readonly processPaymentUseCase: IProcessPaymentUseCase) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.processPaymentUseCase.execute({ orderNumber: input.params.orderNumber, ...input.body })
      return success(204, null)
    } catch (error: any) {
      return handleError(error)
    }
  }
}

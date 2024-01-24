import { ProcessPaymentController } from '@/infra/adapters/controllers/payment/process-payment.controller'
import { makeProcessPaymentUseCase } from '../usecases/process-payment-usecase.factory'

export const makeProcessPaymentController = (): ProcessPaymentController => {
  return new ProcessPaymentController(makeProcessPaymentUseCase())
}

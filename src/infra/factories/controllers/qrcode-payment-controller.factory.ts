import { QrCodePaymentController } from '@/infra/adapters/controllers/webhooks/paid-market/qr-code-payment.controller'
import { makeUpdateOrderStatusUseCase } from '../usecases/update-order-status-usecase.factory'
import { makeUpdatePaymentStatusUseCase } from '../usecases/update-payment-status-usecase.factory'
export const makeQrCodePaymentController = (): QrCodePaymentController => {
  return new QrCodePaymentController(makeUpdateOrderStatusUseCase(), makeUpdatePaymentStatusUseCase())
}

import { QrCodePaymentController } from '../../../application/controllers/webhooks/paid-market/qr-code-payment.controller'
import { makeUpdateOrderStatus } from '../usecases/update-order-status-usecase.factory'
export const makeQrCodePaymentController = (): QrCodePaymentController => {
  return new QrCodePaymentController(makeUpdateOrderStatus())
}
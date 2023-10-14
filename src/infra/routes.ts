import { Router } from 'express'
import { expressAdapter } from './adapters/http/express.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'
import { makeCreateOrderController } from './factories/controllers/create-order-controller.factory'
import { makeQrCodePaymentController } from './factories/controllers/qrcode-payment-controller.factory'
import { makeGetOrderByNumberController } from './factories/controllers/get-order-by-number-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))

// Orders
router.post('/orders', expressAdapter(makeCreateOrderController()))
router.get('/orders/:orderNumber', expressAdapter(makeGetOrderByNumberController()))

// Webhooks
router.post('/webhooks/paid_market/qrcodepayment', expressAdapter(makeQrCodePaymentController()))

export { router }

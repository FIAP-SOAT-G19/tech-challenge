import { Router } from 'express'
import { expressAdapter } from './adapters/http/express.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'
import { makeCreateEmployeeController, makeDeleteEmployeeController, makeReadAllEmployeesController, makeReadEmployeeController, makeUpdateEmployeeController } from './factories/controllers/employee/employee-controller.factory'
import { makeCreateOrderController } from './factories/controllers/create-order-controller.factory'
import { makeQrCodePaymentController } from './factories/controllers/qrcode-payment-controller.factory'
import { makeGetOrderByNumberController } from './factories/controllers/get-order-by-number-controller.factory'
import { makeDeleteOrderController } from './factories/controllers/delete-order-controller.factory'
import { makeUpdateOrderStatusUseCaseController } from './factories/controllers/update-order-status-controller.factory'
import { makeGetAllOrdersController } from './factories/controllers/get-all-orders-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))

// employee
router.post('/employee', expressAdapter(makeCreateEmployeeController()))
router.get('/employee/:id', expressAdapter(makeReadEmployeeController()))
router.get('/employees', expressAdapter(makeReadAllEmployeesController()))
router.patch('/employee/:id', expressAdapter(makeUpdateEmployeeController()))
router.delete('/employee/:id', expressAdapter(makeDeleteEmployeeController()))
// Orders
router.delete('/orders/:orderNumber', expressAdapter(makeDeleteOrderController()))
router.patch('/orders/:orderNumber', expressAdapter(makeUpdateOrderStatusUseCaseController()))
router.get('/orders/:orderNumber', expressAdapter(makeGetOrderByNumberController()))
router.get('/orders', expressAdapter(makeGetAllOrdersController()))
router.post('/orders', expressAdapter(makeCreateOrderController()))

// Webhooks
router.post('/webhooks/paid_market/qrcodepayment', expressAdapter(makeQrCodePaymentController()))

export { router }

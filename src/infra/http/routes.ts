import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
import { makeCreateClientController } from '../factories/controllers/client/create-client-controller.factory'
import { makeDeleteClientController } from '../factories/controllers/client/delete-client-controller.factory'
import { makeGetAllClientsController } from '../factories/controllers/client/get-all-clients-controller.factory'
import { makeLoginClientController } from '../factories/controllers/client/login-client-controller.factory'
import { makeUpdateClientController } from '../factories/controllers/client/update-client-controller.factory'
import { makeCreateEmployeeController } from '../factories/controllers/create-employee-controller.factory'
import { makeCreateOrderController } from '../factories/controllers/create-order-controller.factory'
import { makeCreateProductController } from '../factories/controllers/create-product-controller.factory'
import { makeDeleteEmployeeController } from '../factories/controllers/delete-employee-controller.factory'
import { makeDeleteOrderController } from '../factories/controllers/delete-order-controller.factory'
import { makeDeleteProductController } from '../factories/controllers/delete-product-controller.factory'
import { makeGetAllOrdersController } from '../factories/controllers/get-all-orders-controller.factory'
import { makeGetEmployeeController, makeGetAllEmployeesController } from '../factories/controllers/get-employee-controller.factory'
import { makeGetOrderByNumberController } from '../factories/controllers/get-order-by-number-controller.factory'
import { makeGetOrderStatusController } from '../factories/controllers/get-order-controller.factory'
import { makeGetProductByCategoryController } from '../factories/controllers/get-product-by-category-controller.factory'
import { makeGetProductController } from '../factories/controllers/get-product-controller.factory'
import { makeGetProductsController } from '../factories/controllers/get-products-controller.factory'
import { makeHealthcheckController } from '../factories/controllers/healthcheck-controller.factory'
import { makeProcessPaymentController } from '../factories/controllers/process-payment-controller.factory'
import { makeQrCodePaymentController } from '../factories/controllers/qrcode-payment-controller.factory'
import { makeUpdateEmployeeController } from '../factories/controllers/update-employee-controller.factory'
import { makeUpdateOrderStatusUseCaseController } from '../factories/controllers/update-order-status-controller.factory'
import { makeUpdateProductController } from '../factories/controllers/update-product-controller.factory'
import { selectProductsRoute } from '../middleware/select-products-route'
import { makeLivenessProbeController } from '../factories/controllers/liveness-controller.factory'
import { makeReadinessProbeController } from '../factories/controllers/readiness-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.get('/livenessProbe', expressAdapter(makeLivenessProbeController()))
router.get('/readinessProbe', expressAdapter(makeReadinessProbeController()))

// employee
router.post('/employee', expressAdapter(makeCreateEmployeeController()))
router.get('/employee/:id', expressAdapter(makeGetEmployeeController()))
router.get('/employees', expressAdapter(makeGetAllEmployeesController()))
router.patch('/employee/:id', expressAdapter(makeUpdateEmployeeController()))
router.delete('/employee/:id', expressAdapter(makeDeleteEmployeeController()))
// Orders
router.delete('/orders/:orderNumber', expressAdapter(makeDeleteOrderController()))
router.patch('/orders/:orderNumber', expressAdapter(makeUpdateOrderStatusUseCaseController()))
router.get('/orders/:orderNumber', expressAdapter(makeGetOrderByNumberController()))
router.post('/orders/:orderNumber/pay', expressAdapter(makeProcessPaymentController()))
router.get('/orders/:orderNumber/status', expressAdapter(makeGetOrderStatusController()))
router.get('/orders', expressAdapter(makeGetAllOrdersController()))
router.post('/orders', expressAdapter(makeCreateOrderController()))
// Clients
router.post('/client/auth', expressAdapter(makeLoginClientController()))
router.post('/client', expressAdapter(makeCreateClientController()))
router.patch('/client/:id', expressAdapter(makeUpdateClientController()))
router.get('/client', expressAdapter(makeGetAllClientsController()))
router.delete('/client/:id', expressAdapter(makeDeleteClientController()))
// Products
const getProductsController = selectProductsRoute(makeGetProductByCategoryController(), makeGetProductsController())
router.get('/products', getProductsController)
router.post('/products', expressAdapter(makeCreateProductController()))
router.get('/products/:productId', expressAdapter(makeGetProductController()))
router.patch('/products/:productId', expressAdapter(makeUpdateProductController()))
router.delete('/products/:productId', expressAdapter(makeDeleteProductController()))

// Webhooks
router.post('/webhooks/paid_market/qrcodepayment', expressAdapter(makeQrCodePaymentController()))

export { router }

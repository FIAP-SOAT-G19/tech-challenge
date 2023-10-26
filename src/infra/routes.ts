import { Router } from 'express'
import { makeCreateClientController } from '@/infra/factories/controllers/create-client-controller.factory'
import { makeUpdateClientController } from '@/infra/factories/controllers/update-client-controller.factory'
import { makeDeleteClientController } from './factories/controllers/delete-client-controller.factory'
import { makeGetAllClientsController } from './factories/controllers/get-all-clients-controller.factory'
import { makeCreateEmployeeController, makeDeleteEmployeeController, makeReadAllEmployeesController, makeReadEmployeeController, makeUpdateEmployeeController } from './factories/controllers/employee/employee-controller.factory'
import { makeQrCodePaymentController } from './factories/controllers/qrcode-payment-controller.factory'
import { makeGetOrderByNumberController } from './factories/controllers/get-order-by-number-controller.factory'
import { makeDeleteOrderController } from './factories/controllers/delete-order-controller.factory'
import { makeUpdateOrderStatusUseCaseController } from './factories/controllers/update-order-status-controller.factory'
import { makeGetAllOrdersController } from './factories/controllers/get-all-orders-controller.factory'
import { expressAdapter } from './adapters/http/express.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'
import { makeCreateOrderController } from './factories/controllers/create-order-controller.factory'
import { makeCreateProductController } from './factories/controllers/create-product-controller.factory'
import { makeGetProductController } from './factories/controllers/get-product-controller.factory'
import { makeGetProductsController } from './factories/controllers/get-products-controller.factory'
import { makeUpdateProductController } from './factories/controllers/update-product-controller.factory'
import { makeDeleteProductController } from './factories/controllers/delete-product-controller.factory'
import { makeGetProductByCategoryController } from './factories/controllers/get-product-by-category-controller.factory'

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
// Clients
router.post('/client', expressAdapter(makeCreateClientController()))
router.patch('/client/:id', expressAdapter(makeUpdateClientController()))
router.get('/client', expressAdapter(makeGetAllClientsController()))
router.delete('/client/:id', expressAdapter(makeDeleteClientController()))
// Products
router.post('/products', expressAdapter(makeCreateProductController()))
router.get('/products/:productId', expressAdapter(makeGetProductController()))
router.get('/products', expressAdapter(makeGetProductsController()))
router.patch('/products/:productId', expressAdapter(makeUpdateProductController()))
router.delete('/products/:productId', expressAdapter(makeDeleteProductController()))
router.get('/products', expressAdapter(makeGetProductByCategoryController()))

// Webhooks
router.post('/webhooks/paid_market/qrcodepayment', expressAdapter(makeQrCodePaymentController()))

export { router }

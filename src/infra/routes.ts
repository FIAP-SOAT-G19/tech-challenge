import { Router } from 'express'
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
router.post('/orders', expressAdapter(makeCreateOrderController()))
router.post('/products', expressAdapter(makeCreateProductController()))
router.get('/products/:productId', expressAdapter(makeGetProductController()))
router.get('/products', expressAdapter(makeGetProductsController()))
router.patch('/products/:productId', expressAdapter(makeUpdateProductController()))
router.delete('/products/:productId', expressAdapter(makeDeleteProductController()))
router.get('/products/category/:category', expressAdapter(makeGetProductByCategoryController()))

export { router }

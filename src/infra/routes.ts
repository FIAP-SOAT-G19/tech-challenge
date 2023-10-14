import { Router } from 'express'
import { expressAdapter } from './adapters/http/express.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'
import { makeCreateOrderController } from './factories/controllers/create-order-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.post('/orders', expressAdapter(makeCreateOrderController()))

export { router }

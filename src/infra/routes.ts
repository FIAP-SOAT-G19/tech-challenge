import { Router } from 'express'
import { expressAdapter } from './adapters/http/express.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'
import { makeCreateOrderController } from './factories/controllers/create-order-controller.factory'
import { makeCreateClientController } from './factories/controllers/create-client-controller.factory'
import { makeUpdateClientController } from './factories/controllers/update-client-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.post('/orders', expressAdapter(makeCreateOrderController()))
router.post('/client', expressAdapter(makeCreateClientController()))
router.put('/client', expressAdapter(makeUpdateClientController()))

export { router }

import { Router } from 'express'
import { expressAdapter } from './adapters/http/express.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'
import { makeCreateOrderController } from './factories/controllers/create-order-controller.factory'
import { makeIdentifyClientByCpfController } from './factories/controllers/identify-client-by-cpf-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.post('/orders', expressAdapter(makeCreateOrderController()))
router.get('/client/:cpf', expressAdapter(makeIdentifyClientByCpfController()))

export { router }

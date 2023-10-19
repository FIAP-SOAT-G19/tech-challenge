import { Router } from 'express'
import { expressAdapter } from '@/infra/adapters/http/express.adapter'
import { makeHealthcheckController } from '@/infra/factories/controllers/healthcheck-controller.factory'
import { makeCreateOrderController } from '@/infra/factories/controllers/create-order-controller.factory'
import { makeCreateClientController } from '@/infra/factories/controllers/create-client-controller.factory'
import { makeUpdateClientController } from '@/infra/factories/controllers/update-client-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.post('/orders', expressAdapter(makeCreateOrderController()))
router.post('/client', expressAdapter(makeCreateClientController()))
router.put('/client', expressAdapter(makeUpdateClientController()))

export { router }

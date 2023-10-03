import { Router } from 'express'
import { expressRouteAdapter } from './adapters/express-router.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'

const router = Router()

router.get('/healthcheck', expressRouteAdapter(makeHealthcheckController()))

export { router }

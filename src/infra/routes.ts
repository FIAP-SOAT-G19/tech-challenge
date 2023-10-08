import { Router } from 'express'
import { expressAdapter } from './adapters/http/express.adapter'
import { makeHealthcheckController } from './factories/controllers/healthcheck-controller.factory'
import { makeEmployeeController } from './factories/controllers/employee/employee-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))

// employee
router.post('/employee', expressAdapter(makeEmployeeController()))

export { router }

import { HealthCheckController } from '../../../application/controllers/healthcheck.controller'

export const makeHealthcheckController = (): HealthCheckController => {
  return new HealthCheckController()
}

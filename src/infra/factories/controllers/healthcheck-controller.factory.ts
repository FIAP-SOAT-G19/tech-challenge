import { HealthCheckController } from '../../../application/controllers/healthcheck/healthcheck.controller'

export const makeHealthcheckController = (): HealthCheckController => {
  return new HealthCheckController()
}

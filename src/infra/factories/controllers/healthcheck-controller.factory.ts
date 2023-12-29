import { HealthCheckController } from '@/infra/adapters/controllers/healthcheck/healthcheck.controller'

export const makeHealthcheckController = (): HealthCheckController => {
  return new HealthCheckController()
}

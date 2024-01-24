import { ReadinessController } from '@/infra/adapters/controllers/probes/readiness.controller'

export const makeReadinessProbeController = (): ReadinessController => {
  return new ReadinessController()
}

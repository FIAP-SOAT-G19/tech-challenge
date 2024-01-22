import { LivenessController } from '@/infra/adapters/controllers/probes/liveness.controller'

export const makeLivenessProbeController = (): LivenessController => {
  return new LivenessController()
}

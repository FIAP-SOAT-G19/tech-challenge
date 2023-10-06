import { ControllerInterface } from '@/infra/adapters/ports/controller'

export class HealthCheckController implements ControllerInterface {
  async execute (input: ControllerInterface.Input): Promise<ControllerInterface.Output> {
    return {
      statusCode: 200,
      body: { status: 'OK' }
    }
  }
}

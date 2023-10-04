import { Request, Response } from 'express'
import { ControllerInterface } from './ports/controller'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: ControllerInterface.Input = {
      params: req?.params,
      body: req?.body,
      headers: req?.headers
    }

    const { statusCode, body }: ControllerInterface.Output = await controller.execute(input)

    const output = (statusCode >= 200 && statusCode < 500) ? body : { error: body.message }

    res.status(statusCode).json(output)
  }
}

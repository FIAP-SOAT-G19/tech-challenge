import { IController } from '@/ports/controllers/index.port'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'
import { Request, Response } from 'express'

export const expressAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      params: req?.params,
      body: req?.body
    }

    const { statusCode, body }: HttpResponse = await controller.execute(input)

    const output = (statusCode >= 200 && statusCode < 500) ? body : { error: body.message }

    res.status(statusCode).json(output)
  }
}

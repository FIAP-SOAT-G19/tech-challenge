
import { IController } from '@/application/interfaces'
import { RequestsRepository } from '@/infra/database/repositories/request.repository'
import { HttpRequest, HttpResponse } from '@/infra/shared/types'
import { Request, Response } from 'express'
import { UUIDGeneratorAdapter } from '../uuid/uuid-generator'
import { obfuscateValue } from '@/infra/shared'

export const expressAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const requestRepository = new RequestsRepository()
    const uuidGenerator = new UUIDGeneratorAdapter()

    const input: HttpRequest = {
      params: req?.params,
      body: req?.body,
      query: req?.query
    }

    const requestId = await requestRepository.create({
      id: uuidGenerator.generate(),
      method: req.method,
      input: JSON.stringify(obfuscateValue({ ...input.body })),
      route: req.url,
      createdAt: new Date()
    })

    const { statusCode, body }: HttpResponse = await controller.execute(input)

    const output = (statusCode >= 200 && statusCode < 500) ? body : { error: body.message }

    await requestRepository.update({
      requestId,
      status: statusCode,
      output: JSON.stringify(output),
      updatedAt: new Date()
    })

    res.status(statusCode).json(output)
  }
}

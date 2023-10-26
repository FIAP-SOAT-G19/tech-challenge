import { IController } from '@/ports'
import { Request, Response } from 'express'
import { expressAdapter } from '../adapters/http/express.adapter'

export function selectProductsRoute(getProductByCategoryController: IController, getProductsController: IController) {
  return async (req: Request, res: Response) => {
    const getProductByCategoryOutput = expressAdapter(getProductByCategoryController)
    const getProductsControllerOutput = expressAdapter(getProductsController)
    if (req.query.category) {
      return getProductByCategoryOutput(req, res)
    }
    return getProductsControllerOutput(req, res)
  }
}

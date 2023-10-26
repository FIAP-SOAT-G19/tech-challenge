import { Request, Response } from 'express'

export function selectProductsRoute(getProductByCategoryController: any, getProductsController: any) {
  return async (req: Request, res: Response) => {
    if (req.query.category) {
      return getProductByCategoryController(req, res)
    }
    return getProductsController(req, res)
  }
}

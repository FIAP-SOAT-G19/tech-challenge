export interface IDeleteProductUseCase {
  execute: (
    input: IDeleteProductUseCase.Input
  ) => Promise<IDeleteProductUseCase.Output>
}

export namespace IDeleteProductUseCase {
  export type Input = string
  export type Output = {
    message: string
    productId: string
  }
}

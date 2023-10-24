export interface ICreateProductUseCase {
  execute: (
    input: ICreateProductUseCase.Input
  ) => Promise<ICreateProductUseCase.Output>
}

export namespace ICreateProductUseCase {
  export type Input = {
    name: string
    category: string
    price: number
    description: string
    image: string
  }
  export type Output = {
    productId: string
  }
}

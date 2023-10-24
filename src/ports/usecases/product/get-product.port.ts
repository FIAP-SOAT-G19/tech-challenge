export interface IGetProductUseCase {
  execute: (
    input: IGetProductUseCase.Input
  ) => Promise<IGetProductUseCase.Output>
}

export namespace IGetProductUseCase {
  export type Input = string
  export type Output = {
    id: string
    name: string
    category: string
    price: number
    description: string
    image: string
  }
}

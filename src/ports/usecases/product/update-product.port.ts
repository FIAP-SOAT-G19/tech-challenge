export interface IUpdateProductUseCase {
  execute: (
    id: string,
    input: IUpdateProductUseCase.Input
  ) => Promise<IUpdateProductUseCase.Output>
}

export namespace IUpdateProductUseCase {
  export type Input = {
    name?: string
    category?: string
    price?: number
    description?: string
    image?: string
  }
  export type Output = {
    id: string
    name: string
    category: string
    price: number
    description: string
    image: string
  }
}

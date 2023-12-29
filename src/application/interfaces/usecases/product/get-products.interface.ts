export interface IGetProductsUseCase {
  execute: () => Promise<IGetProductsUseCase.Output[]>
}

export namespace IGetProductsUseCase {
  export type Output = {
    id: string
    name: string
    category: string
  }
}

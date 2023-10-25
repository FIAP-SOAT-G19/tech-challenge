export interface IGetProductByCategoryUseCase {
  execute: (
    input: IGetProductByCategoryUseCase.Input
  ) => Promise<IGetProductByCategoryUseCase.Output[]>
}

export namespace IGetProductByCategoryUseCase {
  export type Input = string
  export type Output = {
    id: string
    name: string
    category: string
  }
}

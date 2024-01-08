export interface IGetOrderStatusUseCase {
  execute: (orderNumber: string) => Promise<IGetOrderStatusUseCase.Output>
}
export namespace IGetOrderStatusUseCase {
  export type Output = {
    status: string
  }
}

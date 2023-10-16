export interface IDeleteOrderUseCase {
  execute: (orderNumber: string) => Promise<void>
}

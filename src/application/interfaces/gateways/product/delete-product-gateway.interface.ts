export interface IDeleteProductGateway {
  deleteProduct: (productId: string) => Promise<boolean>
}

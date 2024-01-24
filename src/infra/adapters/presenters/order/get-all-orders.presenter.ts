import { GetAllOrdersOutput, IGetAllOrdersPresenter, OrderStatus } from '@/application/interfaces'
import { OrderOutput } from '@/application/usecases/order/orders.types'

export class GetAllOrdersPresenter implements IGetAllOrdersPresenter {
  createOrdenation(input: GetAllOrdersOutput): GetAllOrdersOutput {
    if (input?.length) {
      const preparedOrders = input.filter(order => { return order?.status === OrderStatus.PREPARED })
      const inPreparationOrders = input.filter(order => { return order?.status === OrderStatus.IN_PREPARATION })
      const receivedOrders = input.filter(order => { return order?.status === OrderStatus.RECEIVED })

      const result: OrderOutput[] = []

      const hasOtherStatusOrders = !preparedOrders.length && !inPreparationOrders.length && !receivedOrders.length
      if (hasOtherStatusOrders) {
        const ordenatedOrders = this.sortByDate(input)
        result.push(...ordenatedOrders)
      } else {
        const ordenatedPreparedOrders = preparedOrders.length ? this.sortByDate(preparedOrders) : []
        const ordenatedInPreparationOrders = inPreparationOrders.length ? this.sortByDate(inPreparationOrders) : []
        const ordenatedReceivedOrders = receivedOrders.length ? this.sortByDate(receivedOrders) : []

        result.push(...ordenatedPreparedOrders, ...ordenatedInPreparationOrders, ...ordenatedReceivedOrders)
      }
      return result
    }

    return null
  }

  private sortByDate(input: OrderOutput[]): OrderOutput[] {
    return input.sort(function (currentItem, nextItem) {
      const currentItemInMs = currentItem?.paidAt?.valueOf() || currentItem?.createdAt?.valueOf() || 0
      const nextItemInMs = nextItem?.paidAt?.valueOf() || nextItem?.createdAt?.valueOf() || 0

      return currentItemInMs - nextItemInMs
    })
  }
}

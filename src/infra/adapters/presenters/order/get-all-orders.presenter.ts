import { GetAllOrdersOutput, IGetAllOrdersPresenter, OrderStatus } from '@/application/interfaces'
import { OrderOutput } from '@/application/usecases/order/orders.types'

export class GetAllOrdersPresenter implements IGetAllOrdersPresenter {
  
    async createOrdenation(input: GetAllOrdersOutput): Promise<GetAllOrdersOutput> {
        const preparedOrders: OrderOutput[] = [] 
        const inPreparationOrders: OrderOutput[] = []
        const receivedOrders: OrderOutput[] = []
        
        if (input) {
            
            for (const item of input) {
                if (item?.status === OrderStatus.PREPARED) preparedOrders.push(item)
                if (item?.status === OrderStatus.IN_PREPARATION) inPreparationOrders.push(item)
                if (item?.status === OrderStatus.RECEIVED) receivedOrders.push(item)
            }
        
            const result: OrderOutput[] = []
            
            const hasOtherStatusOrders = !preparedOrders.length && !inPreparationOrders.length && !receivedOrders.length
            if (hasOtherStatusOrders) {
                const ordenatedOrders = hasOtherStatusOrders ? await this.sortByDate(input) : []

                result.push(...ordenatedOrders)
            } else {
                const ordenatedPreparedOrders = preparedOrders.length ? await this.sortByDate(preparedOrders) : []
                const ordenatedInPreparationOrders = inPreparationOrders.length ? await this.sortByDate(inPreparationOrders) : []
                const ordenatedReceivedOrders = receivedOrders.length ? await this.sortByDate(receivedOrders) : []
                
                result.push(...ordenatedPreparedOrders, ...ordenatedInPreparationOrders, ...ordenatedReceivedOrders)
            }

            return result
        }

        return null
    }

    private async sortByDate(input: OrderOutput[]): Promise<OrderOutput[]> {

        return input.sort(function (currentItem, nextItem) {
            const currentItemInMs = currentItem?.paidAt?.valueOf() || currentItem?.createdAt?.valueOf() || 0
            const nextItemInMs = nextItem?.paidAt?.valueOf() || nextItem?.createdAt?.valueOf() || 0

            return currentItemInMs - nextItemInMs
        })
    }
}

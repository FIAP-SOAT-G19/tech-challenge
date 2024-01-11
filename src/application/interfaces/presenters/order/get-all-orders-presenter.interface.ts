import { GetAllOrdersOutput } from '../..'

export interface IGetAllOrdersPresenter {
  createOrdenation: (input: GetAllOrdersOutput) => GetAllOrdersOutput
}

export enum OrderStatus {
  PREPARED = 'prepared',
  IN_PREPARATION = 'InPreparation',
  RECEIVED = 'received',
  WAITING_PAYMENT = 'waitingPayment',
  FINALIZED = 'finalized',
  CANCELED = 'canceled'
}

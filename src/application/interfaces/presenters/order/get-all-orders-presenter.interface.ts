import { GetAllOrdersOutput } from '../..'

export interface IGetAllOrdersPresenter {
  createOrdenation: (input: GetAllOrdersOutput) => Promise<GetAllOrdersOutput>
}

export enum OrderStatus {
  PREPARED = 'prepared',
  IN_PREPARATION = 'InPreparation',
  RECEIVED = 'received'
}

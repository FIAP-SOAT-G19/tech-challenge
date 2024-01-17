export interface IPaymentRepository {
  save: (input: SavePaymentInput) => Promise<void>
  updateStatus: (input: UpdatePaymentStatusInput) => Promise<void>
  countPaymentByStatusAndOrderNumber: (status: string, orderNumber: string) => Promise<number>
}

export type SavePaymentInput = {
  id: string
  status: string
  orderNumber: string
  createdAt: Date
  updatedAt: Date | null
  reason: string | null
}

export type UpdatePaymentStatusInput = {
  orderNumber: string
  status: string
  reason: string | null
}

export type PaymentStatus = 'waiting' | 'approved' | 'refused' | 'processing'

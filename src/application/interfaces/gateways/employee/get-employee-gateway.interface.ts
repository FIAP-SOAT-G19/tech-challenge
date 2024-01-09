import { FindEmployeeOutput } from '@/application/interfaces'

export interface IGetEmployeeGateway {
  findAll: () => Promise<FindEmployeeOutput[]>
  findById: (id: string) => Promise<FindEmployeeOutput | null>
}

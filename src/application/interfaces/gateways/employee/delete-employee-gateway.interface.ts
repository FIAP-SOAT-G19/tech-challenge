import { FindEmployeeOutput, SaveEmployeeInput } from '@/application/interfaces'

export interface IDeleteEmployeeGateway {
  findById: (id: string) => Promise<FindEmployeeOutput | null>
  delete: (employee: SaveEmployeeInput) => Promise<void>
}

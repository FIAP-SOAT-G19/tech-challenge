import { Client } from '@/domain/types/clients.types'

export interface IIdentifyClientByCpfUseCase {
  execute: (input: IIdentifyClientByCpfUseCase.Input) => Promise<IIdentifyClientByCpfUseCase.Output>
}

export namespace IIdentifyClientByCpfUseCase {
  export type Input = {
    cpf: string
  }
  export type Output = Client | null
}

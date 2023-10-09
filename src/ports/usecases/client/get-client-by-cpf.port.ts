import { Client } from '@/domain/types/clients.types'

export interface IGetClientByCpfUseCase {
  execute: (input: IGetClientByCpfUseCase.Input) => Promise<IGetClientByCpfUseCase.Output>
}

export namespace IGetClientByCpfUseCase {
  export type Input = {
    cpf: string
  }
  export type Output = Client
}

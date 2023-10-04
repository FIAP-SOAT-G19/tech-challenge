export interface ControllerInterface {
  execute: (input: ControllerInterface.Input) => Promise<ControllerInterface.Output>
}

export namespace ControllerInterface {
  export type Input = {
    params?: any
    body?: any
    headers?: any
  }

  export type Output = {
    statusCode: number
    body: any
  }
}

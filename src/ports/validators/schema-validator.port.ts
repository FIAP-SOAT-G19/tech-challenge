export interface ISchemaValidator {
  validate: (input: ISchemaValidator.Input) => ISchemaValidator.Output
}

export namespace ISchemaValidator {
  export type Input = {
    schema: any
    data: any
  }

  export type Output = {
    value: object
    error?: any | undefined
  }
}

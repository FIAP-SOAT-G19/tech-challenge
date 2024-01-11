export interface ICardValidator {
  validate: (card: ICardValidator.Input) => ICardValidator.Output
}

export namespace ICardValidator {
  export type Input = {
    brand: string
    number: string
    cvv: string
    expiryMonth: string
    expiryYear: string
  }

  export type Output = {
    field: string
  } | null
}

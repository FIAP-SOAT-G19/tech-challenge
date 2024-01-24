import { ICardValidator } from '@/application/interfaces/validators/card-validator.interface'
import * as cardValidator from 'card-validator'

export class CardValidtorAdapter implements ICardValidator {
  validate (card: ICardValidator.Input): ICardValidator.Output {
    if (!cardValidator.number(card.number).isValid) {
      return {
        field: 'number'
      }
    }

    if (!cardValidator.expirationMonth(card.expiryMonth).isValid) {
      return {
        field: 'expiryMonth'
      }
    }

    if (!cardValidator.expirationYear(card.expiryYear).isValid) {
      return {
        field: 'expiryYear'
      }
    }

    if (!cardValidator.cvv(card.cvv).isValid) {
      return {
        field: 'cvv'
      }
    }

    return null
  }
}

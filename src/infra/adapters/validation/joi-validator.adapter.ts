import { ISchemaValidator } from '@/ports/validators/schema-validator.port'
import * as schemas from './schemas'

export class JoiValidatorSchemaAdapter implements ISchemaValidator {
  validate (input: ISchemaValidator.Input): ISchemaValidator.Output {
    const schema = (schemas as Record<string, any>)[input.schema]
    return schema.validate(input.data)
  }
}

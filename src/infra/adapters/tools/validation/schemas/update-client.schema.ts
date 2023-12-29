import Joi from 'joi'

const updateClientSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
  cpf: Joi.string().alphanum().length(11).optional()
}).optional()

export { updateClientSchema }

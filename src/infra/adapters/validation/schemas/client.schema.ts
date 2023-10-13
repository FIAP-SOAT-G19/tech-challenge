import Joi from 'joi'

export const clientSchema = Joi.object({
  cpf: Joi.string().length(11).required()
})

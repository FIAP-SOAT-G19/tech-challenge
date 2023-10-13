import Joi from 'joi'

export const getClientByCpfSchema = Joi.object({
  cpf: Joi.string().length(11).required()
})

import Joi from 'joi'

const clientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  cpf: Joi.string().alphanum().length(11).required(),
  // password: Joi.string().pattern(/'^[a-zA-Z0-9]{3,30}$'/),
  password: Joi.string().required(),
  repeatPassword: Joi.ref('password')
})

export { clientSchema }

import Joi from 'joi'

const employeeSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100),
  email: Joi.string().email(),
  cpf: Joi.string()
    .length(11),
  password: Joi.string()
    .min(6)
    .max(20)
})

export { employeeSchema }

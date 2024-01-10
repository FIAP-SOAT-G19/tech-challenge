import Joi from 'joi'

const paymentSchema = Joi.object({
  creditCard: Joi.object({
    brand: Joi.string().required(),
    number: Joi.string().required(),
    expiryMonth: Joi.string().required(),
    expiryYear: Joi.string().required(),
    cvv: Joi.string().required()
  }).required(),
  payer: Joi.object({
    name: Joi.string().required(),
    document: Joi.string().required()
  }).required(),
  orderNumber: Joi.string().required()
})

export { paymentSchema }

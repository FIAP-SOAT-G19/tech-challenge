import Joi from 'joi'

const orderSchema = Joi.object({
  clientId: Joi.string().guid({
    version: ['uuidv4']
  }),
  clientDocument: Joi.string(),
  products: Joi.array().items(
    Joi.object({
      id: Joi.string().guid({
        version: ['uuidv4']
      }).required(),
      price: Joi.number().required(),
      amount: Joi.number().required()
    }).min(1)
  )
})

export { orderSchema }

import Joi from 'joi'

const orderSchema = Joi.object({
  clientId: Joi.string().guid({
    version: ['uuidv4']
  }),

  totalValue: Joi.number().required()
})

export { orderSchema }

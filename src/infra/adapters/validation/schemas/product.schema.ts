import Joi from 'joi'

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required()
})

const getProductSchema = Joi.string().required()

export { productSchema, getProductSchema }

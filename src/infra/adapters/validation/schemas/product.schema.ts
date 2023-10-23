import Joi from 'joi'

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required()
})

const getProductSchema = Joi.string().required()

const updateProductSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
  image: Joi.string()
})

export { productSchema, getProductSchema, updateProductSchema }

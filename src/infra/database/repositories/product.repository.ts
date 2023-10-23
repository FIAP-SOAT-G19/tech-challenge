import { ProductCategory } from '@prisma/client'
import { prismaClient } from '../prisma-client'
import {
  GetProductByIdOutput,
  GetProducts,
  IProductRepository,
  ProductUpdateOptions,
  SaveProductInput
} from '@/ports/repositories/product.port'
import { ProductNotFoundError } from '@/shared/errors'

export class ProductRepository implements IProductRepository {
  async save(input: SaveProductInput): Promise<string> {
    const product = await prismaClient.product.create({
      data: {
        id: input.id,
        name: input.name,
        category: input.category as ProductCategory,
        price: input.price,
        description: input.description,
        image: input.image,
        createdAt: input.createdAt
      }
    })
    return product.id
  }

  async getById(input: string): Promise<GetProductByIdOutput | null> {
    const product = await prismaClient.product.findUnique({
      where: {
        id: input
      }
    })
    if (!product) return null

    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image
    }
  }

  async getAll(): Promise<GetProducts[] | []> {
    const products = await prismaClient.product.findMany()
    if (!products) return []
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category
    }))
  }

  async update(productId: string, updateOptions: ProductUpdateOptions): Promise<GetProductByIdOutput | null> {
    const product = await prismaClient.product.findUnique({
      where: {
        id: productId
      }
    })
    if (!product) throw new ProductNotFoundError()

    const updatedFields = {
      name: updateOptions?.name ?? product.name,
      category: (updateOptions?.category ?? product.category) as ProductCategory,
      price: updateOptions?.price ?? product.price,
      description: updateOptions?.description ?? product.description,
      image: updateOptions?.image ?? product.image
    }

    const productUpdated = await prismaClient.product.update({
      where: {
        id: productId
      },
      data: {
        name: updatedFields.name,
        category: updatedFields.category,
        price: updatedFields.price,
        description: updatedFields.description,
        image: updatedFields.image
      }
    })
    if (!productUpdated) {
      return null
    }
    return productUpdated
  }
}

import { GetProductByCategoryOutput, GetProductByIdOutput, GetProducts, IProductRepository, ProductUpdateOptions, SaveProductInput } from '@/application/interfaces'
import { prismaClient } from '../prisma-client'
import { ProductNotFoundError } from '@/infra/shared'

type ProductCategory = 'snack' | 'accompaniment' | 'drink' | 'dessert'

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

  async getByCategory(input: string): Promise<GetProductByCategoryOutput[] | null> {
    const products = await prismaClient.product.findMany({
      where: {
        category: input as ProductCategory
      }
    })
    if (!products) return null

    return products.map((product: GetProductByCategoryOutput) => ({
      id: product.id,
      name: product.name,
      category: product.category
    }))
  }

  async getAll(): Promise<GetProducts[] | []> {
    const products = await prismaClient.product.findMany()
    if (!products) return []
    return products.map((product: GetProductByCategoryOutput) => ({
      id: product.id,
      name: product.name,
      category: product.category
    }))
  }

  async update(updateOptions: ProductUpdateOptions): Promise<GetProductByIdOutput | null> {
    const product = await prismaClient.product.findUnique({
      where: {
        id: updateOptions.id
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
        id: updateOptions.id
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
    return {
      id: productUpdated.id,
      name: productUpdated.name,
      category: productUpdated.category,
      price: productUpdated.price,
      description: productUpdated.description,
      image: productUpdated.image
    }
  }

  async delete(input: string): Promise<boolean> {
    const product = await prismaClient.product.findUnique({
      where: {
        id: input
      }
    })
    if (!product) throw new ProductNotFoundError()

    const deletedProduct = await prismaClient.product.delete({
      where: {
        id: product.id
      }
    })
    if (!deletedProduct) {
      return false
    }
    return true
  }
}

import { ProductCategory } from '@prisma/client'
import { prismaClient } from '../prisma-client'
import { IProductRepository, SaveProductInput } from '@/ports/repositories/product.port'

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
}

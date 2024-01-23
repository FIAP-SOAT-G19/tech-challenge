export interface RequestRepositoryInterface {
  create: (input: CreateRequestRepositoryInput) => Promise<void>
}

export type CreateRequestRepositoryInput = {
  id: string
  method: string
  route: string
  input: string
  status: number
  output: string
  createdAt: Date
}

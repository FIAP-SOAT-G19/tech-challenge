export interface RequestRepositoryInterface {
  create: (input: CreateRequestRepositoryInput) => Promise<string>
  update: (input: UpdateRequestRepositotyInput) => Promise<void>
}

export type CreateRequestRepositoryInput = {
  id: string
  method: string
  route: string
  input: string
  createdAt: Date
}

export type UpdateRequestRepositotyInput = {
  requestId: string
  status: number
  output: string
  updatedAt: Date
}

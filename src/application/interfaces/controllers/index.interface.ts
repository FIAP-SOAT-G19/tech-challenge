import { HttpResponse, HttpRequest } from '@/infra/shared/types/http.types'

export interface IController {
  execute: (input: HttpRequest) => Promise<HttpResponse>
}

import { HttpResponse, HttpRequest } from '@/shared/types/http.types'

export interface IController {
  execute: (input: HttpRequest) => Promise<HttpResponse>
}

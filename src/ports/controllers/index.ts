import { HttpResponse, HttpRequest } from '@/shared/types/http.types'

export interface ControllerInterface {
  execute: (input: HttpRequest) => Promise<HttpResponse>
}

import { IController } from '@/ports/controllers/index.port'
import { handleError } from '@/shared/errors/handle-error'
import { HttpRequest, HttpResponse } from '../../../shared/types/http.types'
import { Pool } from 'pg'

export class HealthCheckController implements IController {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const dbConfig = {
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: 5432
    }

    const pool = new Pool(dbConfig)

    try {
      await pool.connect()
      return {
        statusCode: 200,
        body: { status: 'OK' }
      }
    } catch (error) {
      return handleError(error)
    } finally {
      void pool.end()
    }
  }
}

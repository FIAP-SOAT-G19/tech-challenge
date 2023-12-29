import '../shared/config/module-alias'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { router } from './routes'
import swaggerDocument from '@/infra/docs/swagger.json'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const port = process.env.PORT ?? 3000

app.listen(port, () => { console.log(`Server running at port ${port}`) })

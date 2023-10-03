import 'module-alias/register'
import express from 'express'
import cors from 'cors'
import { router } from './infra/routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

const port = process.env.PORT ?? 3000

app.listen(port, () => { console.log(`Server running at port ${port}`) })

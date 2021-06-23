import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import './database'
import { router } from './routes'
import { ErrorMiddleware } from './middlewares/ErrorsMiddleware'

const app = express()

app.use(express.json())
app.use(router)

// yarn add express-async-errors
// Express não possui suporte para tratamento de erros assincronos
app.use(ErrorMiddleware)

app.listen(3300, () => {
  console.log('Server is runing on port 3300')
})

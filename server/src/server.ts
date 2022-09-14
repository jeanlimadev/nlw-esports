import express, { Request, Response } from "express"

const app = express()

app.get('/ads', (request: Request, response: Response) => {
  return response.json({ message: "funcionou!" })
})

app.listen(3333, () => {
  console.log('Server is running')
})
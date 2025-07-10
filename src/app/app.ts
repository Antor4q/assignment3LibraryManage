import express, { Application, Request, Response } from "express"
import { booksRoute } from "./controlers/books.controler"
import { borrowRoute } from "./controlers/borrow.controler"

const app:Application = express()

app.use(express.json())

app.use("/api", booksRoute)
app.use("/api", borrowRoute)

app.get("/", (req:Request, res:Response) => {
    res.send('Welcome to the book library')
})

export default app
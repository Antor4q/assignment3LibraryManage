import express, { Application, Request, Response } from "express"
import { booksRoute } from "./app/controlers/books.controler"
import { borrowRoute } from "./app/controlers/borrow.controler"
import cors from 'cors';

const app:Application = express()

app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  "https://athenaeum-lib.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials:true,
}));



app.use("/api", booksRoute)
app.use("/api", borrowRoute)

app.get("/", (req:Request, res:Response) => {
    res.send('Welcome to the book library')
})

export default app
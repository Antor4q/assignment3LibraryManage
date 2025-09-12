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

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false); // instead of throwing error
      }
    },
    credentials: true,
  })
);

// Handle preflight OPTIONS request globally
app.options("*", cors());



app.use("/api", booksRoute)
app.use("/api", borrowRoute)

app.get("/", (req:Request, res:Response) => {
    res.send('Welcome to the book library')
})

export default app
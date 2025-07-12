import express, { Request, Response } from "express"
import { Book } from "../models/books.model";

export const booksRoute = express.Router()

booksRoute.get("/books", async (req: Request, res: Response) => {
  const { filter, sortBy , sort, limit} = req.query;

  try {
    const filterObj: { genre?: string } = {};
    if (filter && typeof filter === "string") {
      filterObj.genre = filter;
    }

    const sortOrder = sort === "asc" ? 1 : -1;

    const data = await Book.find({genre:filter})
      .sort({ [sortBy as string]: sortOrder })
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error
    });
  }
});

booksRoute.get("/books/:bookId", async (req:Request,res:Response)=>{
    try{
        const bookId = req.params.bookId
      const data = await Book.findById(bookId)

       res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data
    });
    }catch(error){
        res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error
    });
    }
})

booksRoute.patch("/books/:bookId", async(req:Request,res:Response)=> {
   try{
     const bookId = req.params.bookId
    const body = req.body
    const data = await Book.findByIdAndUpdate(bookId,body,{new: true})

     res.status(200).json({
      success: true,
      message: "Books updated successfully",
      data
    });
   }catch(error){
         res.status(500).json({
      success: false,
      message: "Failed to update book",
      error
    });
   }
})

booksRoute.delete("/books/:bookId", async(req:Request,res:Response)=> {
   try{
     const bookId = req.params.bookId
    
    const data = await Book.findByIdAndDelete(bookId)

     res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data
    });
   }catch(error){
         res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error
    });
   }
})


booksRoute.post("/books", async(req:Request,res:Response) => {
   try{
     const body = req.body;
    
    const book = await Book.create(body)
    res.status(201).json({success: true, message:"Book created successfully",book})
   }catch(error){
     res.status(400).json({ message:"Book has not created. Please try again.",success:false,error})
   }
})
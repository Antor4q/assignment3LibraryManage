import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";


export const borrowRoute = express.Router()



borrowRoute.post("/borrow", async (req: Request, res: Response): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;


    const book = await Book.findById(bookId);
    if (!book) {
     res.status(404).json({ success: false, message: "Book not found" });
     return
    }

    if (book.copies < quantity) {
      res.status(400).json({ success: false, message: "Not enough copies available" });
      return
    }

    book.copies -= quantity;

    await book.updateAvailability();

    const borrow = await Borrow.create({
      book:book._id,
      quantity,
      dueDate
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Book note successfully borrowed", error });
  }
});

borrowRoute.get("/borrow", async (req:Request,res:Response)=>{
  try{
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: {$sum: "$quantity"}
        }
      },{
        $lookup : {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },{
        $unwind: "$bookDetails"
      },{
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"},
            totalQuantity:1
        },
       
      }
    ])

    res.status(200).json({success:true,message:"Borrowed books summary retrieved successfully",data})
  }catch(error){
      res.status(500).json({success: false, message: "Failed to retrieve borrowed books summary", error})
  }
})





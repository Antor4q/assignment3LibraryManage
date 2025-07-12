import { model, Schema, UpdateQuery } from "mongoose";
import { IBook } from "../interface/books.interface";


export interface IBookDocument extends IBook, Document {
  updateAvailability(): Promise<void>;
}

const bookSchema = new Schema<IBookDocument>({
    title: {type:String,required:true, trim: true},
    author: {type: String, required: true},
    genre: {
        type:String,
        enum: ['FICTION','NON_FICTION','SCIENCE','HISTORY','BIOGRAPHY','FANTASY']
    },
    isbn: {type: String, required: true, unique: true},
    description: {type: String},
    copies: {type: Number, required: true, min: 0},
    available: {type: Boolean, default: true}
},
{
    versionKey: false,
    timestamps: true
}
)

bookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<typeof Book>;
  if (update.copies !== undefined){
  if (update.copies === 0) {
      update.available = false;
    } else {
      update.available = true;
    }
    this.setUpdate(update);
  }
  next();
});

bookSchema.post("save", function (doc) {
  console.log(`${doc.title} has been created successfully.`);
});

bookSchema.method("updateAvailability", async function() {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  await this.save();
});

export const Book = model<IBookDocument>("Book",bookSchema)


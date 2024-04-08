import mongoose, { model, Schema } from "mongoose";

const BookSchema = Schema({
  bookId: String,
  title: String,
  categories: Array,
  description: String,
  authors: Array,
  pageCount: String,
  imageLinks: Array,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

const Book = model('Book', BookSchema)
export default Book
import mongoose, { Schema, model } from "mongoose";

const UserSchema = Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
  provider: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
  order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true })

const User = model('User', UserSchema)
export default User
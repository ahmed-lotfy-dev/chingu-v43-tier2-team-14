import { model, Schema } from "mongoose";

const CartItemShema = Schema({
  name: String,
  price: String,
  image: String,
  author: String,
  quantity: String
}, { timestamps: true })

const CartItem = model('CartItem', CartItemShema)
export default CartItem

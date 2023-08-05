import express from "express"
import User from "../models/userModel.js"
import Cart from "../models/cartModel.js"
import CartItem from "../models/cartItemModel.js"
import { GOOGLE_BOOKAPI_URL, GOOGLE_BOOKAPI, NYTIMES_BOOK_KEY, NYTIMES_BOOK_URL, NYTIMES_BOOK_SECRET } from "../utils/secrets.js"

const router = express.Router()

router.get('/get-cart-items', async (req, res, next) => {
  const { userId } = req.body
  console.log(userId)
});

router.post('/add-item-to-cart', async (req, res, next) => {
  const { userId, item } = req.body
  const { name, image, price, author, quantity } = item
  console.log(item);

  const cartItem = await CartItem.create({ data: { userId, name, image, price, author, quantity } })
  console.log(cartItem);

  console.log({ userId, item })
});

router.post('/remove-item-from-cart', async (req, res, next) => {
  const { userId, item } = req.body
  console.log({ userId, item })

});

export default router
import { model, Schema } from "mongoose";

const CartSchema = Schema({
  cartItem: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

const Cart = model('Cart', CartSchema)
export default Cart

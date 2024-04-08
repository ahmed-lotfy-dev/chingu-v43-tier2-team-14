import { model, Schema } from "mongoose";

const OrderSchema = Schema({
  cartId: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

const Order = model('Order', OrderSchema)
export default Order

import { relations } from "drizzle-orm"
import {
  user,
  session,
  account,
  verification,
  book,
  userBook,
  cart,
  order,
  orderCart,
} from "./schema.js"

const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  userBooks: many(userBook),
  cartItems: many(cart),
  orders: many(order),
}))

const bookRelations = relations(book, ({ many }) => ({
  userBooks: many(userBook),
}))

const userBookRelations = relations(userBook, ({ one }) => ({
  user: one(user, {
    fields: [userBook.userId],
    references: [user.id],
  }),
  book: one(book, {
    fields: [userBook.bookId],
    references: [book.id],
  }),
}))

const cartItemRelations = relations(cart, ({ one }) => ({
  user: one(user, {
    fields: [cart.userId],
    references: [user.id],
  }),
}))

const orderRelations = relations(order, ({ one, many }) => ({
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  orderItems: many(orderCart),
}))

const orderCartRelations = relations(orderCart, ({ one }) => ({
  order: one(order, {
    fields: [orderCart.orderId],
    references: [order.id],
  }),
  cartItem: one(cart, {
    fields: [orderCart.cartItemId],
    references: [cart.id],
  }),
}))

export {
  userRelations,
  bookRelations,
  userBookRelations,
  cartItemRelations,
  orderRelations,
  orderCartRelations,
}

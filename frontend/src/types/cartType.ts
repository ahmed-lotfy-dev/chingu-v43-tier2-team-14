export type CartItem = {
  id: string // Unique identifier (e.g. book ID)
  name: string // Book title
  author: string // Book author(s)
  price: number // Numeric price (e.g. 19.99)
  quantity: number // Quantity in cart
  image: string // Thumbnail or cover image URL
}

export type Cart = {
  items: CartItem[] // Array of items in the cart
  totalPrice: number // Total price of all items in the cart
  totalQuantity: number // Total quantity of all items in the cart
}

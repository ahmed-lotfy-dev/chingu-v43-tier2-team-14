
// type CartStoreState = {
//   cart: any[]
//   // getBooks: () => Promise<void>
// }

// const store = (): CartStoreState => ({
//   cart: [],
// })
//   // addItemToCartState: (item: any) =>
//   //   set((state) => {
//   //     const cartItemExist = state.cart.some(
//   //       (cartItem) => cartItem.id === item.id
//   //     )
//   //     if (!cartItemExist) {
//   //       return {
//   //         cart: [...state.cart, item],
//   //       }
//   //     }
//   //     return state
//   //   }),

//   // removeItemFromCartState: async (item) => {
//   //   set((state) => {
//   //     return { ...state.cart, item }
//   //   })
//   // },

//   // addCartDB: async function (userId, item) {
//   //   const response = await axios.post(
//   //     `/api/cart/add-item-to-cart`,
//   //     { userId: userId, item }
//   //   );
//   //   set((state) => ({ ...state.cart, response }));
//   // },

//   // removeCartDB: async (userId) => {
//   //   const response = await axios.post(
//   //     `/api/cart/remove-item-from-cart`,
//   //     {
//   //       userId: userId,
//   //     }
//   //   );
//   //   set({ response });
//   // },


// export const cartStore = create(devtools(store))

import express from "express";
const router = express.Router();
router.get("/get-cart-items", async (req, res, next) => {
    const { userId } = req.body;
    console.log(userId);
});
router.post("/add-item-to-cart", async (req, res, next) => {
    const { userId, item } = req.body;
    const { name, image, price, author, quantity } = item;
    console.log(item);
    const cartItem = await CartItem.create({
        data: { userId, name, image, price, author, quantity },
    });
    console.log(cartItem);
    console.log({ userId, item });
});
router.post("/remove-item-from-cart", async (req, res, next) => {
    const { userId, item } = req.body;
    console.log({ userId, item });
});
export default router;
/**
 * @swagger
 * /api/cart/get-cart-items:
 *   get:
 *     summary: Get items in the user's cart
 *     description: Retrieve items in the cart associated with a specific user.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart items are to be fetched.
 *     responses:
 *       '200':
 *         description: A list of items in the user's cart.
 *       '400':
 *         description: Bad request. Error message included in the response body.

 * /api/cart/add-item-to-cart:
 *   post:
 *     summary: Add an item to the user's cart
 *     description: Add an item to the cart associated with a specific user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user adding the item to the cart.
 *               item:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 *                   price:
 *                     type: number
 *                   author:
 *                     type: string
 *                   quantity:
 *                     type: number
 *     responses:
 *       '200':
 *         description: Item added to cart successfully.
 *       '400':
 *         description: Bad request. Error message included in the response body.

 * /api/cart/remove-item-from-cart:
 *   post:
 *     summary: Remove an item from the user's cart
 *     description: Remove an item from the cart associated with a specific user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user removing the item from the cart.
 *               item:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *     responses:
 *       '200':
 *         description: Item removed from cart successfully.
 *       '400':
 *         description: Bad request. Error message included in the response body.
 */

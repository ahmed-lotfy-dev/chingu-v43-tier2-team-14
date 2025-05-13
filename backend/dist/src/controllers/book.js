import { db } from "../db";
import { book } from "../db/schema";
import { eq } from "drizzle-orm";
export async function AddBook(fields) {
    const [created] = await db
        .insert(book)
        .values({ ...fields })
        .returning();
    console.log(created);
    return created;
}
export async function userBooks(userId) {
    const [userBooks] = await db.query.book
        .findMany({ where: eq(book.userId, userId) })
        .prepare("userBooks")
        .execute();
    return userBooks;
}
export async function singleUserBook(userId, id) {
    const userBook = await db.query.book.findFirst({ where: eq(book.id, id) });
}

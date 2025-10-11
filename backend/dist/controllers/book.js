import { db } from "../db/index.js";
import { book } from "../db/schema.js";
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
export async function findOrCreateBook(googleBookId, bookDetails) {
    let bookEntry = await db
        .select()
        .from(book)
        .where(eq(book.googleBookId, googleBookId))
        .limit(1);
    if (bookEntry.length === 0) {
        const newBook = await db
            .insert(book)
            .values({
            googleBookId: googleBookId,
            ...bookDetails,
        })
            .returning();
        if (newBook.length === 0) {
            throw new Error("Failed to create book entry");
        }
        bookEntry = newBook;
    }
    return bookEntry[0];
}

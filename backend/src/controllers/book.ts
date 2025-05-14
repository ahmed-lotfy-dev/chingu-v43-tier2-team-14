import { db } from "../db/index.js"
import { book } from "../db/schema.js"
import { eq } from "drizzle-orm"

export async function AddBook(fields: any) {
  const [created] = await db
    .insert(book)
    .values({ ...fields })
    .returning()

  console.log(created)

  return created
}

export async function userBooks(userId: string) {
  const [userBooks] = await db.query.book
    .findMany({ where: eq(book.userId, userId) })
    .prepare("userBooks")
    .execute()

  return userBooks
}

export async function singleUserBook(userId: string,id:string) {
  const userBook = await db.query.book.findFirst({ where: eq(book.id, id) })
}

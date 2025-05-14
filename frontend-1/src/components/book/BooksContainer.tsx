import { useParams } from "react-router"
import BookCard from "./BookCard"
import { useQuery } from "@tanstack/react-query"
import { getCategoryBooks } from "../../utils/api/categoryBooks"

const BooksContainer = () => {
  const { category } = useParams()

  // Default to "all" if no category is present
  const selectedCategory = category || "all"

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categoryBooks", selectedCategory],
    queryFn: () => getCategoryBooks(selectedCategory),
    enabled: !!selectedCategory,
  })

  if (isLoading) {
    return <div className="text-center py-8">Loading books...</div>
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">Failed to load books.</div>
    )
  }

  return (
    <section className="w-full">
      <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 px-4 py-8 max-w-screen-xl mx-auto">
        {books?.items?.map((book: any) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  )
}

export default BooksContainer

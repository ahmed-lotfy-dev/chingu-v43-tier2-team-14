import { useRef, useEffect } from "react"
import { useParams } from "react-router"
import BookCard from "./BookCard"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getCategoryBooks } from "../../utils/api/categoryBooksApi"

const BooksContainer = () => {
  const { category } = useParams()
  const selectedCategory = category || "all"
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["categoryBooks", selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      getCategoryBooks(selectedCategory, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    enabled: !!selectedCategory,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return <div className="text-center py-8">Loading books...</div>
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">Failed to load books.</div>
    )
  }

  console.log(data)
  const books = data?.pages.flatMap((page) => page.items || [])

  return (
    <section className="w-full">
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 px-4 py-8 max-w-screen-xl mx-auto justify-items-stretch"
        ref={loadMoreRef}
      >
        {books?.map((book: any, idx: number) => {
          console.log({ book })
          return (
            <div key={`${book.id}-${idx}`}>
              <BookCard {...book} />
            </div>
          )
        })}
      </div>

      {isFetchingNextPage && (
        <div className="text-center py-4">Loading more books...</div>
      )}

      <div ref={loadMoreRef} className="h-5" />
    </section>
  )
}

export default BooksContainer

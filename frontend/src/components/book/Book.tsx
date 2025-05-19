import BookBody from "./BookBody"
import BookImage from "./BookImage"
import { useParams } from "react-router"
import NoContent from "../NoContent"
import Loading from "../UI/Loading"
import { useQuery } from "@tanstack/react-query"
import { getSingleBook } from "../../utils/api/singleBookApi"
import { ONE_DAY } from "../../utils/constants"

const Book = () => {
  // const single_book_url = `${import.meta.env.VITE_BACKEND_URL}/api/books/`;

  const { isbn } = useParams()
  const { data: singleBook, isLoading } = useQuery({
    queryKey: ["singleBook", isbn],
    queryFn: () => getSingleBook(isbn as string),
    enabled: !!isbn,
    staleTime: ONE_DAY * 7,
  })

  if (isLoading) {
    return <Loading />
  }
  console.log(isbn)
  console.log(singleBook)
  return (
    <div className="px-8 mx-auto mb-14 lg:px-24">
      {!singleBook ? (
        <NoContent message="there is no data available at the moment!" />
      ) : (
        <div className="items-start justify-center section-wrapper">
          <BookImage singleBook={singleBook} />
          <BookBody singleBook={singleBook} id={isbn!} />
        </div>
      )}
    </div>
  )
}

export default Book

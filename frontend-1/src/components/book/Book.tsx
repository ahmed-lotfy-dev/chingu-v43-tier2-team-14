import BookBody from "./BookBody"
import BookImage from "./BookImage"
import { useParams } from "react-router"
import NoContent from "../NoContent"
import Loading from "../UI/Loading"
import { useQuery } from "@tanstack/react-query"
import { getSingleBook } from "../../utils/api/singleBook"

const Book = () => {
  // const single_book_url = `${import.meta.env.VITE_BACKEND_URL}/api/books/`;

  const { id } = useParams()
  const { data: singleBook, isLoading } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: () => getSingleBook(id as string),
    enabled: !!id,
  })
  
  // const { data: singleBook, isLoading } = useFetch(`${
  //   import.meta.env.VITE_BACKEND_URL
  // }/api/books/${id}
  // `)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="px-8 mx-auto mb-14 lg:px-24">
      {!singleBook ? (
        <NoContent message="there is no data available at the moment!" />
      ) : (
        <div className="items-start justify-center section-wrapper">
          <BookImage singleBook={singleBook} />
          <BookBody singleBook={singleBook} id={id} />
        </div>
      )}
    </div>
  )
}

export default Book

import { useParams } from "react-router"
import BookBody from "../book/BookBody"
import BookImage from "../book/BookImage"
import Loading from "../UI/Loading"
import { useQuery } from "@tanstack/react-query"
import { getSingleBook } from "../../utils/api/singleBookApi"
import { ONE_DAY } from "../../utils/constants/constants"

const FeaturedSingleBook = () => {
  const { isbn } = useParams()
  const {
    data: singleBook,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["singleFeaturedBook", isbn],
    queryFn: () => getSingleBook(isbn as string),
    enabled: !!isbn,
    staleTime: ONE_DAY,
  })

  if (isLoading) return <Loading />
  if (isError) return <div>Error loading book. {error.message}</div>
  console.log(singleBook)
  console.log(isbn)
  return (
    <div className="px-8 mx-auto mb-14 lg:px-24">
      {!singleBook ? (
        <Loading />
      ) : (
        <div className="items-start justify-center section-wrapper">
          <BookImage singleBook={singleBook.volumeInfo} />
          <BookBody singleBook={singleBook.volumeInfo} id={singleBook.id} />
        </div>
      )}
    </div>
  )
}

export default FeaturedSingleBook

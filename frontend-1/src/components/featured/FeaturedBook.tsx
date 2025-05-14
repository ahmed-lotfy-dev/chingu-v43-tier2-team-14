import { useParams } from "react-router"
import { useEffect, useState } from "react"
import BookBody from "../book/BookBody"
import BookImage from "../book/BookImage"
import Loading from "../UI/Loading"
type SingleBook = {
  id: string;
  volumeInfo: any; 
};

const FeaturedSingleBook = () => {
  const { id } = useParams()
  const [singleBook, setSingleBook] = useState<SingleBook | null>(null)
  const fetchSingleBook = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/books/single-book/${id}`
    )
    const data = await res.json()
    setSingleBook(data.singleBook.items[0])
  }
  console.log("from featured book", { singleBook })

  useEffect(() => {
    fetchSingleBook()
  }, [id])

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

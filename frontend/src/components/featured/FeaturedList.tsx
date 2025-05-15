import { Link } from "react-router"

interface Book {
  title: string
  book_image: string
  primary_isbn13: string
}

interface FeaturedListProps {
  list: {
    books: Book[]
  }
}

const FeaturedList = ({ list }: FeaturedListProps) => {
  const { books } = list
  console.log(books)
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 justify-items-center">
      {books?.map((book: Book) => {
        const { title, book_image, primary_isbn13: id } = book
        return (
          <article
            key={id}
            className="flex flex-col items-center p-4 border border-slate-300 rounded-md shadow-md bg-white"
          >
            <h4 className="mb-2 text-sm text-center font-semibold text-slate-700">
              {title.substring(0, 20)}
              {/* longer preview */}
            </h4>
            <Link to={`/featured/${title}`}>
              <figure className="w-full">
                <img
                  src={book_image}
                  alt={`${title} Cover Image`}
                  className="w-full h-auto object-contain"
                />
              </figure>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export default FeaturedList

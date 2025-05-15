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

  return (
    <div className="flex flex-row gap-6">
      {books?.map((book) => {
        const { title, book_image, primary_isbn13: id } = book
        return (
          <article key={id} className="flex flex-col">
            <h4 className="flex-initial px-6 py-3 text-sm text-center rounded-lg bg-slate-400 font-semi-bold">
              {title.substring(0, 15)}
            </h4>
            <Link to={`/featured/${title}`}>
              <figure className="relative mt-6 overflow-hidden">
                <div className="flex animation">
                  <img
                    src={book_image}
                    alt={`${title} Cover Image`}
                    className="flex-1 min-h-full"
                  />
                </div>
              </figure>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export default FeaturedList

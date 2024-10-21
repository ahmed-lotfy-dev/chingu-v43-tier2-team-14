import { Link } from "react-router-dom"
const FeaturedList = ({ list }) => {
  const { books } = list

  return (
    <div className="grid w-full gap-6 grid-cols-200">
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

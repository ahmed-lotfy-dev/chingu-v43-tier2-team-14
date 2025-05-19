import FeaturedList from "./FeaturedList"

interface Book {
  title: string
  book_image: string
  primary_isbn13: string
  isbns: { isbn10: string; isbn13: string }[]
}

type FeaturedListType = {
  list_id: string | number
  list_name: string
  books: Book[]
}

const FeaturedBookBody = ({ featuredBooks }: { featuredBooks: any }) => {
  if (
    !featuredBooks ||
    !featuredBooks.lists ||
    featuredBooks.lists.length === 0
  ) {
    return (
      <div className="text-center py-8 text-red-500">
        No featured books found.
      </div>
    )
  }
  return (
    <div className="wrapper">
      {featuredBooks.lists.map((list: FeaturedListType) => {
        return (
          <div key={list.list_name} className="flex flex-col justify-center">
            <h1 className="py-3 mt-12 mb-5 text-xl text-center transition-all duration-500 bg-red-300 rounded-lg cursor-pointer md:text-xl hover:bg-red-400 px-7">
              {list.list_name}
            </h1>
            <FeaturedList key={list.list_id} list={list} />
          </div>
        )
      })}
    </div>
  )
}

export default FeaturedBookBody

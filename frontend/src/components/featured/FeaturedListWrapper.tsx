import { useQuery } from "@tanstack/react-query"
import FeaturedList from "./FeaturedList"
import { getFeaturedBooks } from "../../utils/api/featuredBooksApi"
import NoContent from "../NoContent"
import Loading from "../UI/Loading"
import { ONE_DAY } from "../../utils/constants/constants"

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

const FeaturedBookWrapper = () => {
  const { data: featuredBooks, error } = useQuery({
    queryKey: ["featuredBooks"],
    queryFn: () => getFeaturedBooks(),
    staleTime: ONE_DAY,
  })

  if (!featuredBooks && !error) return <Loading size="large" color="blue" />
  if (error || !featuredBooks) {
    return (
      <NoContent message={error?.message || "No featured books available."} />
    )
  }
  return (
    <div className="wrapper">
      <h2 className="font-semibold text-center">
        Best Sellers Books For &nbsp;
        {featuredBooks.bestsellers_date
          ? new Date(featuredBooks.bestsellers_date).toLocaleDateString(
              "en-us",
              {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )
          : "Unknown Date"}
      </h2>
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

export default FeaturedBookWrapper

import { useLoaderData } from "react-router"
import FeaturedBookBody from "./FeaturedBookBody"
import Loading from "../UI/Loading"
import NoContent from "../NoContent"

const FeaturedListWrapper = () => {
  const loaderData = useLoaderData() as { data?: any; error?: string }

  const featuredBooks = loaderData?.data
  const error = loaderData?.error

  if (!featuredBooks && !error) return <Loading size="large" color="blue" />
  if (error || !featuredBooks) {
    return <NoContent message={error || "No featured books available."} />
  }

  return (
    <div className="flex flex-col p-5 mb-24 md:pr-24">
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
      <FeaturedBookBody featuredBooks={featuredBooks} />
    </div>
  )
}

export default FeaturedListWrapper

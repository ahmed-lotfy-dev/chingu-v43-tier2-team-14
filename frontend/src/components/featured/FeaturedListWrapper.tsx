import { useLoaderData } from "react-router"
import FeaturedBookBody from "./FeaturedBookBody"

const FeaturedListWrapper = () => {
  const { data: featuredBooks } = useLoaderData()
  return (
    <div className="flex flex-col p-5 mb-24 md:pr-24">
      <h2 className="font-semibold text-center">
        Best Sellers Books For &nbsp;
        {featuredBooks && featuredBooks.bestsellers_date
          ? new Date(featuredBooks.bestsellers_date).toLocaleDateString(
              "en-us",
              {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )
          : "Loading..."}
      </h2>
      <FeaturedBookBody />
    </div>
  )
}

export default FeaturedListWrapper

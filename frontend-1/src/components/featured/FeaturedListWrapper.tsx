import { useLoaderData } from "react-router"
import FeaturedBookBody from "./FeaturedBookBody"

const FeaturedListWrapper = () => {
  const { data: featuredList } = useLoaderData()

  // Handle undefined or empty featuredList gracefully
  if (!featuredList || Object.keys(featuredList).length === 0) {
    return <div>Loading Featured Books...</div>
  }

  return (
    <div className="flex p-5 mb-24 md:pr-24">
      <h2 className="font-semibold text-center">
        Best Sellers Books For &nbsp;
        {featuredList.bestsellers_date
          ? new Date(featuredList.bestsellers_date).toLocaleDateString(
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

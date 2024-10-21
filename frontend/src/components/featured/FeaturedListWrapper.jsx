import FeaturedBookBody from "./FeaturedBookBody"
import { bookStore } from "../../features/bookStore"
import { useEffect } from "react"

const FeaturedListWrapper = () => {
  const featuredList = bookStore((state) => state.featuredList)
  const getFeatured = bookStore((state) => state.getFeatured)

  useEffect(() => {
    getFeatured()
  }, [getFeatured]) // Ensure getFeatured is called once on mount

  // Handle undefined or empty featuredList gracefully
  if (!featuredList || Object.keys(featuredList).length === 0) {
    return <div>Loading Featured Books...</div>
  }

  return (
    <div className="w-full p-5 mb-24 md:pr-24">
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

import FeaturedBookBody from "./FeaturedBookBody";
import { bookStore } from "../../features/bookStore";
import { useEffect } from "react";

const FeaturedListWrapper = () => {
  const featuredList = bookStore((state) => state.featuredList);
  const getFeatured = bookStore((state) => state.getFeatured);

  useEffect(() => {
    getFeatured();
    console.log(featuredList);
  }, []);

  console.log(featuredList);
  return (
    <div className="w-full p-5 mb-24 md:pr-24">
      <h2 className="font-semibold text-center">
        Best Sellers Books For{" "}
        {new Date(featuredList.bestsellers_date).toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </h2>
      <FeaturedBookBody />
    </div>
  );
};

export default FeaturedListWrapper;

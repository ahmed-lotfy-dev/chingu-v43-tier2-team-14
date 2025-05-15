import { bookStore } from "../../features/bookStore";
import FeaturedList from "./FeaturedList";

const FeaturedBookBody = () => {
  const featuredList = bookStore((state) => state.featuredList);
  console.log(featuredList);
  return (
    <div className="wrapper">
      {featuredList?.map((list) => {
        return (
          <div key={list.list_name} className="flex flex-wrap justify-center">
            <h1 className="py-3 mt-12 mb-5 text-xl text-center transition-all duration-500 bg-red-300 rounded-lg cursor-pointer md:text-xl hover:bg-red-400 px-7">
              {list.list_name}
            </h1>
            <FeaturedList key={list.list_id} list={list} />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedBookBody;

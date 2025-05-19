import CategoriesNav from "../components/CategoriesNav"
import FeaturedListWrapper from "../components/featured/FeaturedListWrapper"

const Home = () => {
  return (
    <>
      <section className="w-full items-start justify-start col-start-3 col-span-full p-8">
        <CategoriesNav />
        <FeaturedListWrapper />
      </section>
    </>
  )
}

export default Home

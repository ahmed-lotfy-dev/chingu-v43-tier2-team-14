import CategoriesNav from "../components/CategoriesNav";
import BooksContainer from "../components/book/BooksContainer";

const Books = () => {
  return (
    <div className="w-full">
      <CategoriesNav />
      <BooksContainer />
    </div>
  );
};
export default Books;

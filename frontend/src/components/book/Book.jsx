import BookBody from "./BookBody";
import BookImage from "./BookImage";
import { useParams } from "react-router-dom";
import NoContent from "../NoContent";
import useFetch from "../../hooks/useFetch";
import Loading from "../UI/Loading";

const Book = () => {
  // const single_book_url = `${import.meta.env.VITE_BACKEND_URL}/api/books/`;
  const single_book_url = `https://www.googleapis.com/books/v1/volumes/`;

  const { id } = useParams();
  // const { data: singleBook, isLoading } = useFetch(`${single_book_url}${id}`);
  const { data: singleBook, isLoading } = useFetch(`${
    import.meta.env.VITE_BACKEND_URL
  }/api/books/${id}
  `);
  if (isLoading) {
    return <Loading />;
  }
  console.log(import.meta.env.VITE_BACKEND_URL);
  return (
    <div className="px-8 mx-auto mb-14 lg:px-24">
      {!singleBook ? (
        <NoContent message="there is no data available at the moment!" />
      ) : (
        <div className="grid items-start justify-center section-wrapper grid-col-1 lg:grid-cols-2">
          <BookImage singleBook={singleBook} />
          <BookBody singleBook={singleBook} id={id} />
        </div>
      )}
    </div>
  );
};

export default Book;

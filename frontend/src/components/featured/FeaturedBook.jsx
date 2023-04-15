import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookBody from "../book/BookBody";
import BookImage from "../book/BookImage";
import Loading from "../UI/Loading";
const FeaturedSingleBook = () => {
  const { id } = useParams();
  const [singleBook, setSingleBook] = useState(null);
  const fetchSingleBook = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/books/single-book/${id}`
    );
    const data = await res.json();
    console.log(data.singleBook.items[0]);
    setSingleBook(data.singleBook.items[0]);
  };

  useEffect(() => {
    fetchSingleBook();
  }, [id]);
  console.log(singleBook);
  const { title, authors, categories, description, pageCount, imageLinks } =
    singleBook || {};
  return (
    <section className="px-12 mx-auto mb-14 lg:px-24">
      {!singleBook ? (
        <Loading />
      ) : (
        <div className="grid items-start justify-center section-wrapper grid-col-1 lg:grid-cols-2">
          <BookImage singleBook={singleBook.volumeInfo} />
          <BookBody singleBook={singleBook.volumeInfo} id={singleBook.id} />
        </div>
      )}
    </section>
  );
};

export default FeaturedSingleBook;

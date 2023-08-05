import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookCard from "./BookCard";

const BooksContainer = () => {
  const { category } = useParams();
  console.log(category);
  const [books, setBooks] = useState([]);
  const fetchCategory = async () => {
    const res = await fetch(
      // grid-cols-1 md:grid-cols-2 lg:grid-cols-3
      // `${import.meta.env.VITE_BACKEND_URL}/api/books?category=${category}`
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/books?category=${category}&lang=en`
    );
    const data = await res.json();
    console.log(data.categories.items);
    setBooks(data.categories.items);
  };

  useEffect(() => {
    fetchCategory();
  }, [category]);
  return (
    <section className="flex flex-col justify-center">
      <div className="p-12 grid grid-cols-250 gap-6">
        {books.map((book) => {
          return <BookCard key={book.id} {...book} />;
        })}
      </div>
    </section>
  );
};

export default BooksContainer;

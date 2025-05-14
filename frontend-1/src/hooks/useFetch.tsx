import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await fetch(url);
      const incomingData = await res.json();
      setData(incomingData?.Book?.volumeInfo);
      setIsLoading(false);
      console.log(incomingData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [url]);

  return { data, isLoading };
};

export default useFetch;

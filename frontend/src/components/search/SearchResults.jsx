import { Link } from "react-router-dom";
const SearchResults = ({ results, clearInput }) => {
  const { items } = results;

  return (
    <>
      {items && (
        <div className="z-50 absolute rounded-2xl bg-gray-100 w-[275px] md:w-[400px] px-4 md:px-8 py-3">
          {items.map((item) => (
            <div
              className="px-2 py-2 mt-3 rounded-md cursor-pointer md:px-5 hover:bg-red-300"
              key={item.id}
              onClick={() => {
                clearInput();
              }}
            >
              <div className="flex items-center">
                {item.volumeInfo.imageLinks?.thumbnail && (
                  <Link to={`/book/${item.id}`}>
                    <img
                      className="w-16 md:w-auto"
                      src={item.volumeInfo.imageLinks.thumbnail}
                      alt="book-img"
                    />
                  </Link>
                )}
                <div className="flex flex-col w-full ml-2 md:ml-10">
                  <Link to={`/book/${item.id}`}>
                    <h4>{item.volumeInfo.title}</h4>
                    <p className="mt-3 text-sm font-light">
                      by {item.volumeInfo.authors && item.volumeInfo.authors[0]}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;

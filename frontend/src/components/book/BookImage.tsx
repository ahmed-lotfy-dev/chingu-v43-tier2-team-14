type ImageLinks = {
  thumbnail: string;
};

type BookImageProps = {
  singleBook: {
    imageLinks?: ImageLinks;
  };
};

const BookImage = ({ singleBook: { imageLinks } }: BookImageProps) => {
  // const img = imageLinks.thumbnail.replace("zoom=1", "zoom=2");

  return (
    <img
      decoding="async"
      className="mx-auto w-52 aspect-auto my-12"
      src={
        imageLinks
          ? imageLinks.thumbnail
          : "https://via.placeholder.com/300x400"
      }
      alt="image"
    />
  );
};
export default BookImage;

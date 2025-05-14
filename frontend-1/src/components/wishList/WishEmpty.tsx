import NoContent from "../NoContent";

const WishEmpty = () => {
  return (
    <article>
      <h3 className="mt-4 font-semibold text-xl">your Wishlist is empty!</h3>
      <NoContent
        message="You don't have any products added in your wishlist. Search and save
        items to your liking!"
      />
    </article>
  );
};
export default WishEmpty;

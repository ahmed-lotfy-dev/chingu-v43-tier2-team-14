import HomeBtn from "./UI/HomeBtn";
const NoContent = ({ message }) => {
  return (
    <>
      <article className="bg-red-200 rounded-sm border-l-4 border-red-600 md:w-1/2 text-center capitalize text-xl mx-auto mt-12">
        <p className="py-4 px-2">{message}</p>
      </article>
      <div className="text-center">
        <HomeBtn />
      </div>
    </>
  );
};
export default NoContent;

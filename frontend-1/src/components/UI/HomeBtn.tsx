import { Link } from "react-router";

const HomeBtn = () => {
  return (
    <button className="my-8 px-4 w-fit mx-auto py-2 bg-bg-btn text-text-btn rounded-md capitalize duration-300 hover:text-white">
      <Link to="/">return homepage</Link>
    </button>
  );
};
export default HomeBtn;

import img from "../../assets/loading2.svg";

const Loading = () => {
  return (
    <article className="h-screen flex flex-col justify-center items-center">
      <img src={img} className="w-1/2 opacity-40" alt="loading-img" />
    </article>
  );
};
export default Loading;

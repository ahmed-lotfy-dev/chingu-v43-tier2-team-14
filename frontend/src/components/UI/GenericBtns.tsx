
type GenericBtnsProps = {
  title: string;
  icon: React.ReactNode;
};

const GenericBtns = ({ title, icon }: GenericBtnsProps) => {
  return (
    <>
      <button className="flex items-center bg-bg-btn text-text-btn rounded-full px-6 py-2 hover:text-white">
        <h3 className="capitalize mr-4 font-bold">{title}</h3>
        <span className="text-xl">{icon}</span>
      </button>
    </>
  )
}
export default GenericBtns

const BookBtns = ({ icon, handler }) => {
  return (
    <>
      <div
        className="bg-zinc-200 p-3 cursor-pointer rounded-full duration-300 hover:text-white hover:bg-bg-btn"
        onClick={handler}
      >
        {icon}
      </div>
    </>
  )
}
export default BookBtns

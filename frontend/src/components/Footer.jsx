import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiGithub,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="col-start-1 col-span-full py-5 px-3 md:px-10 lg:px-28 bg-[#ddd] z-10">
      <div className=" mt-5 flex gap-2 justify-center">
        <span className="flex justify-center hover:text-blue-800 items-center bg-grey-300  rounded-full text-black w-8 h-8 text-xl cursor-pointer">
          <FiFacebook />
        </span>
        <span className="flex justify-center hover:text-red-400 items-center bg-grey-300  rounded-full text-black w-8 h-8 text-xl cursor-pointer">
          <FiInstagram />
        </span>
        <span className="flex justify-center hover:text-blue-800 items-center bg-grey-300  rounded-full text-black w-8 h-8 text-xl cursor-pointer">
          <FiLinkedin />
        </span>
        <span className="flex justify-center hover:text-white items-center bg-grey-300 rounded-full text-black w-8 h-8 text-xl cursor-pointer">
          <FiGithub />
        </span>
        <span className="flex justify-center hover:text-blue-900 items-center bg-grey-300  rounded-full text-black w-8 h-8 text-xl cursor-pointer">
          <FiTwitter />
        </span>
      </div>

      <p className="border-t-2 py-5 mt-5 text-sm text-center text-white ">
        Copyright @ 2023 Virtual Book App. All Right Reserved
      </p>
    </footer>
  );
};
export default Footer;

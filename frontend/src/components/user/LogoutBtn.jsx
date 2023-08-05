import React from "react";
import { userStore } from "../../features/userStore";

const handleLogout = () => {
  logout;
  localStorage.removeItem("isAuthenticated");
};

const Logoutbtn = () => {
  const logout = userStore((state) => state.logout);

  return (
    <a
      className="flex items-center bg-bg-btn text-text-btn rounded-full px-6 py-2  hover:text-white"
      href={`${import.meta.env.VITE_BACKEND_URL}/auth/logout`}
      onClick={handleLogout}
    >
      Logout
    </a>
  );
};

export default Logoutbtn;

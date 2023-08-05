import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { bookStore } from "../features/bookStore";
import Sidebar from "../components/Sidebar";
import { userStore } from "../features/userStore";
import SearchWrapper from "../components/search/SearchWrapper";

const Root = () => {
  const fetchUserData = userStore((state) => state.fetchUserData);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  return (
    <main className="bg-gray-50 grid grid-cols-12 min-h-screen">
      <SearchWrapper />
      <Sidebar />
      <Outlet />
      <Footer />
    </main>
  );
};
export default Root;

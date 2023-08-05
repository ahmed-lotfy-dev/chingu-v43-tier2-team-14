import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import LogIn from "./pages/LogIn";
import Error from "./pages/Error";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/WishList";
import Books from "./pages/Books";
import "./App.css";
import FeaturedPage from "./pages/FeaturedPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/:id",
          // element: <FeaturedSingleBook />,
          element: <FeaturedPage />,
        },
        {
          path: "books",
          element: <Books />,
        },
        {
          path: "books/:category",
          element: <Books />,
        },
        {
          path: "book/:id",
          element: <BookDetails />,
        },
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

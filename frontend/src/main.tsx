import { createBrowserRouter, RouterProvider } from "react-router"

import ReactDOM from "react-dom/client"

import App from "./App"
import Error from "./pages/Error"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import BookDetails from "./pages/BookDetails"
import WishList from "./pages/WishList"
import Books from "./pages/Books"
import FeaturedPage from "./pages/FeaturedPage"
import Loading from "./components/UI/Loading"
import SignIn from "./pages/Signin"
import SignUp from "./pages/Signup"
import User from "./pages/User"
import NotFound from "./pages/NotFound"

const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: "<Error />",
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/featured/:isbn",
        // element: <FeaturedSingleBook />,
        element: <FeaturedPage />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "books/category/:category",
        element: <Books />,
      },
      {
        path: "book/:isbn",
        element: <BookDetails />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />)

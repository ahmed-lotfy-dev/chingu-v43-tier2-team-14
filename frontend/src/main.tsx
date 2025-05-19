import { createBrowserRouter, RouterProvider } from "react-router"

import ReactDOM from "react-dom/client"

import App from "./App"
// import Error from "./pages/Error"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import LogIn from "./pages/LogIn"
import BookDetails from "./pages/BookDetails"
import WishList from "./pages/WishList"
import Books from "./pages/Books"
import FeaturedPage from "./pages/FeaturedPage"
import { getFeaturedBooks } from "./utils/api/featuredBooksApi"
import Loading from "./components/UI/Loading"

const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          // return data from here
          return { data: await getFeaturedBooks() }
        },
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
        path: "login",
        element: <LogIn />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
])

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(<RouterProvider router={router} />)

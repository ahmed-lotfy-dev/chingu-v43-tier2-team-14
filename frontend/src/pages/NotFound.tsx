import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white text-center">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500 transition"
      >
        Go back home
      </Link>
    </div>
  )
}

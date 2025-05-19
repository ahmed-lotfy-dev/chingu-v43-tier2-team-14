import { useState } from "react"
import { authClient } from "../../utils/auth-client"
import { Link } from "react-router"
import toast, { Toaster } from "react-hot-toast"

export default function SignInComponent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await authClient.signIn.email({
        email,
        password,
      })

      if (data.data) {
        toast.success("Logged in successfully")
        console.log(data)
      } else {
        const errorMessage =
          typeof data.error === "string"
            ? data.error
            : data.error?.message || "Login failed"
        toast.error(errorMessage, {
          position: "top-right",
          className: "mr-4 mt-12",
        })
        console.error(data.error)
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || err?.data?.error?.message || "Something went wrong"
      toast.error(errorMessage)
      console.error("Email login failed:", err)
    }
  }

  const handleSignInWithGmail = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
      })
      console.log(data)
    } catch (err) {
      toast.error("Something went wrong")
      console.error("Google login failed:", err)
    }
  }

  return (
    <div className="flex w-full min-h-full flex-1 flex-col px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <button
          onClick={handleSignInWithGmail}
          className="group h-12 w-full border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
        >
          <div className="relative flex items-center space-x-4 justify-center">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="absolute left-4 w-5"
              alt="google logo"
            />
            <span className="block w-max ml-5 cursor-pointer font-semibold tracking-wide text-gray-700 dark:text-blue-700 text-sm group-hover:text-blue-600 sm:text-base">
              Continue with Google
            </span>
          </div>
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              or sign in with email
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 flex justify-center items-center flex-col mt-10 mb-5">
          <p>you can use this test account email:</p>
          <p>test@gmail.com</p>
          <p>password: 00000000</p>
        </div>
        <form onSubmit={handleSignInWithEmail} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member? &nbsp;
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign Up Now
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  )
}

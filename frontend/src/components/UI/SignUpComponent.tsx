import { useState } from "react"
import { authClient } from "../../utils/auth-client"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import type { AuthResponse } from "../../types/authResponse"
import type { CustomError } from "../../types/customError"

export default function SignUpComponent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignUpWithEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = (await authClient.signUp.email({
        name,
        email,
        password,
      })) as AuthResponse

      if (data.data) {
        toast.success("Successfully signed up!", {
          position: "top-right",
          className: "mr-4 mt-12",
        })
        navigate("/user")
        console.log("Signup data:", data)
      } else {
        const errorMessage =
          typeof data.error === "string"
            ? data.error
            : data.error?.message || "Sign up failed"
        toast.error(errorMessage, {
          position: "top-right",
          className: "mr-4 mt-12",
        })
        console.error("Signup error:", data.error)
      }
    } catch (err: unknown) {
      const error = err as CustomError

      const errorMessage =
        error.message || error.data?.error?.message || "Something went wrong"
      toast.error(errorMessage, {
        position: "top-right",
        className: "mr-4 mt-12",
      })
      console.error("Signup exception:", err)
    }
  }

  return (
    <div className="flex w-full min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignUpWithEmail} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-base border border-gray-300 focus:outline-indigo-600"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-base border border-gray-300 focus:outline-indigo-600"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full rounded-md px-3 py-1.5 text-base border border-gray-300 focus:outline-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold hover:bg-indigo-500"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

import { Outlet } from "react-router"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"
import SearchWrapper from "./components/search/SearchWrapper"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import useAuth from "./hooks/useAuth"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient()

const App = () => {
  const { user } = useAuth()
  console.log(user)
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-gray-50 min-h-screen flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden">
            <SearchWrapper />
            <Outlet />
          </div>
        </div>
        <Footer />
      </main>
      <Toaster/>
    </QueryClientProvider>
  )
}
export default App

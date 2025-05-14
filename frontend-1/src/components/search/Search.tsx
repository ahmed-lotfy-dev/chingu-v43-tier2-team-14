import SearchResults from "./SearchResults"
import { IoSearchOutline } from "react-icons/io5"
import { useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"

const Search = () => {
  const [value, setValue] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const debouncedValue = useDebounce(value, 1000)

  const clearInput = () => {
    setValue("")
  }

  const fetchSearchResults = async (value: string) => {
    setSearchResults([]) // reset search results to an empty array
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/books/search-books/${value}`
    )
    const data = await res.json()
    if (data && data.books) {
      setSearchResults(data.books)
    }
  }

  const handleSearchInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValue(value)
  }

  useEffect(() => {
    fetchSearchResults("")
  }, [])

  useEffect(() => {
    fetchSearchResults(value)
  }, [debouncedValue])

  return (
    <div className="relative border-1 rounded-xl flex items-center justify-enter w-10/12 gap-3 shadow-md">
      <IoSearchOutline className="absolute text-2xl text-slate-400 left-3" />
      <input
        type="text"
        placeholder="Search book name, author, edition.."
        className="w-full py-2 pl-12 pr-4 bg-transparent border-none caret-red-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-600"
        value={value}
        onChange={(event) => handleSearchInput(event)}
        onBlur={() => clearInput()}
      />
      {searchResults && (
        <div className="absolute mt-12 transition-all duration-500">
          <SearchResults results={searchResults} clearInput={clearInput} />
        </div>
      )}
    </div>
  )
}

export default Search

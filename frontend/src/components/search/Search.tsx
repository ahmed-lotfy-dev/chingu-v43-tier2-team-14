import { IoSearchOutline } from "react-icons/io5"
import { useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { getSearchResult } from "../../utils/api/searchResultsApi"
import SearchResults from "./SearchResults"

const Search = () => {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value, 1000)

  const { data: searchResults } = useQuery({
    queryKey: ["searchResult", debouncedValue],
    queryFn: () => getSearchResult(debouncedValue),
    enabled: !!debouncedValue,
  })

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const clearInput = () => {
    setValue("")
  }

  return (
    <div className="relative border-1 rounded-xl flex items-center justify-enter w-10/12 gap-3 shadow-md">
      <IoSearchOutline className="absolute text-2xl text-slate-400 left-3" />
      <input
        type="text"
        placeholder="Search book name, author, edition.."
        className="w-full py-2 pl-12 pr-4 bg-transparent border-none caret-red-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-600"
        value={value}
        onChange={handleSearchInput}
        onBlur={clearInput}
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

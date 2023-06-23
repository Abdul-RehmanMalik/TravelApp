import { useEffect, useState } from 'react'
import apiInstance from '../axios'
import SearchBarDropdownMenu from './SearchBarDropDown'

interface User {
  id: number
  name: string
  email: string
  address: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<User[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    try {
      const fetchData = async () => {
        console.log('Query:', query)
        const res = await apiInstance.post(`/posts/search`, { query })
        setData(res.data.users)
        console.log(res.data)
      }

      if (query.length === 0 || query.length > 2) fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [query])

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const handleSearchBlur = () => {
    setIsSearchFocused(false)
    setQuery('')
    setData([])
  }

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <svg
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35"
          />
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <input
        type="text"
        className={`block ${
          isSearchFocused ? 'w-100' : 'w-48'
        } pl-10 pr-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm mx-auto`}
        placeholder="Search"
        value={query}
        onChange={handleQueryChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      />
      {isSearchFocused && query.length > 0 && (
        <div className="absolute left-0 mt-2 w-100">
          <SearchBarDropdownMenu data={data} />
        </div>
      )}
    </div>
  )
}

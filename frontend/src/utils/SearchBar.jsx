import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-80">
    <input
      type="text"
      placeholder="Search todos..."
      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  </div>
  )
}

export default SearchBar

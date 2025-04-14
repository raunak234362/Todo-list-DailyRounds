import React from 'react'
import PriorityFilters from '../utils/PriorityFilters'
import TodoTags from '../utils/TodoTags'
// import TodoTags from '../utils/TodoTags'

const Sidebar = ({ filters, onFilterChange }) => {
  return (
    <aside className="md:w-64 border-r bg-white m-5 rounded-sm drop-shadow-xl border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <PriorityFilters priorities={filters.priority} onChange={(value) => onFilterChange("priority", value)} />

      {/* <TodoTags tags={filters.tags} onChange={(value) => onFilterChange("tags", value)}/> */}
    </aside>
  )
}

export default Sidebar

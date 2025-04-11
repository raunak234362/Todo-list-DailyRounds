import React from 'react'

const TodoTags = ({ priority, tags, assignedTo }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs">{priority}</span>

    {tags.map((tag) => (
      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
        {tag}
      </span>
    ))}

    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{assignedTo}</span>
  </div>
  )
}

export default TodoTags

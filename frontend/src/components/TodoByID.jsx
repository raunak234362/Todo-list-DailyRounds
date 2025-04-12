import { X } from 'lucide-react'
import React from 'react'

const TodoByID = ({ todo, onClose }) => {
  if (!todo) {
    return (
      <div className="text-gray-500 text-center p-4">
        No Todo selected.
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg md:w-[50vw] w-full">
    <button
          onClick={onClose}
          className=" text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-5 h-5" />
        </button>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{todo.title}</h2>

      <div className="mb-4">
        <p className="text-gray-700">{todo.description || "No description provided."}</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="text-sm text-gray-600">
          <strong>Priority:</strong> {todo.priority}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Due Date:</strong> {todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'N/A'}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Notes:</strong>
          {Array.isArray(todo?.notes) && todo?.notes?.length > 0 ? (
            <ul className="list-disc list-inside">
              {todo?.notes?.map((note, index) => (
                <li key={index} className="justify-between text-gray-800">{note.content} -  {note.createdAt ? new Date(note.createdAt).toLocaleString() : 'N/A'}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">No notes provided.</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <strong className="block text-gray-700 mb-1">Tags:</strong>
        <div className="flex flex-wrap gap-2">
          {todo.tags?.length > 0 ? (
            todo.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">No tags</span>
          )}
        </div>
      </div>

      <div>
        <strong className="block text-gray-700 mb-1">Assigned Users:</strong>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {todo.assignedUsers?.length > 0 ? (
            todo.assignedUsers.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))
          ) : (
            <li className="text-gray-400">Not assigned</li>
          )}
        </ul>
      </div>
    </div>
    </div>
  )
}

export default TodoByID

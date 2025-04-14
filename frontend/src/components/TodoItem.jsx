import React, {useEffect} from 'react'
import TodoTags from '../utils/TodoTags'
import { Edit2, MoreVertical, Trash2 } from 'lucide-react'
import Service from '../api/Service'

const TodoItem = ({ todo, onToggle, onDeleteTodo, onSelectTodo, onSelectEditTodo }) => {
  const handleRowClick = () => {
    onSelectTodo(todo?._id)
  }
  const handleUpdate = async (data) => {
   
    try {
      await Service.updateTodo(todo?._id, data);
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    (todo)
  }, [todo])
  const stopPropagation = (e) => e.stopPropagation()
  

  return (
    <div 
      className="p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-all" 
      onClick={handleRowClick}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            stopPropagation(e);
            handleUpdate({ completed: !todo.completed });
            onToggle();
          }}
          className="mt-1 rounded border-blue-500"
          onClick={stopPropagation}
        />
        <div className="flex-1 gap-3 flex flex-col">
          <h3 className="font-bold text-lg text-gray-800">{todo.title}</h3>
          <TodoTags
            priority={todo.priority}
            tags={todo.tags}
            assignedTo={todo?.assignedUsers.map(user => user.username).join(', ')}
          />
        </div>
        <div className="flex gap-2">
          <button onClick={stopPropagation} className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
          <button onClick={(e) => { stopPropagation(e); onSelectEditTodo(todo?._id) }} className="text-gray-400 hover:text-gray-600">
            <Edit2 className="w-5 h-5" />
          </button>
          <button onClick={(e) => { stopPropagation(e); onDeleteTodo(todo?._id) }} className="cursor-pointer text-gray-400 hover:text-gray-600">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem

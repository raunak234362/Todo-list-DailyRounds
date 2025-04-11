import React, { useState } from 'react'
import SearchBar from '../utils/SearchBar'
import TodoItem from './TodoItem'
import AddTodoForm from './AddTodoForm'

const Todolist = ({ todos, onTodoToggle, onSearchChange, searchQuery,onAddTodo,users,onDeleteTodo  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <button className='bg-gray-400 px-3 py-1 rounded-xl font-semibold cursor-pointer' onClick={() => setIsModalOpen(true)}>Add Todo</button>
                </div>
                <div>
                    <SearchBar value={searchQuery} onChange={onSearchChange} />
                </div>
            </div>
            <div className="bg-white rounded-md shadow-sm border border-gray-200 mb-6">
                {todos?.length > 0 ? (
                    todos?.map((todo) => <TodoItem  onDeleteTodo={() => onDeleteTodo(todo?._id)} key={todo?.id} todo={todo} onToggle={() => onTodoToggle(todo?.id)} />)
                ) : (
                    <div className="p-4 text-center text-gray-500">No todos found</div>
                )}
            </div>

            <AddTodoForm
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddTodo={onAddTodo}
            />
        </div>
    )
}

export default Todolist

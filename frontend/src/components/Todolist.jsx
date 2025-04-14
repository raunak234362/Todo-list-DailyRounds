import React, { useState, useEffect } from 'react'
import SearchBar from '../utils/SearchBar'
import TodoItem from './TodoItem'
import AddTodoForm from './AddTodoForm'
import EditTodobyID from './EditTodobyID'

const Todolist = ({ todos, onTodoToggle, onSearchChange, searchQuery, onAddTodo, todoByID, users, onDeleteTodo, onUpdateTodo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editTodoId, setEditTodoId] = useState(null);
    const closeModal = () => setEditTodoId(null);

    useEffect(() => {
    }, [todos, searchQuery]);
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
                    todos?.map((todo) => <TodoItem
                        key={todo?._id} 
                        todo={todo}
                        onDeleteTodo={() => onDeleteTodo(todo?._id)}
                        onSelectEditTodo={(id) => setEditTodoId(id)}
                        onSelectTodo={() => todoByID(todo?._id)}
                        onToggle={() => onTodoToggle(todo?._id)}
                        onUpdateTodo={onUpdateTodo} />)
                ) : (
                    <div className="p-4 text-center text-gray-500">No todos found</div>
                )}
            </div>

            {editTodoId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
                        <EditTodobyID users={users} id={editTodoId} onClose={closeModal} />
                    </div>
                </div>
            )}

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

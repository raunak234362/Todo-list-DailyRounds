/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Header from "./components/Header"
import Sidebar from './components/Sidebar'
import Todolist from './components/Todolist'
import Pagination from './utils/Pagination'
import Service from './api/Service'
import TodoByID from './components/TodoByID'

function App() {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  const [todos, setTodos] = useState([])
  const [todoByID, setTodoByID] = useState(null)

  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    priority: {
      High: false,
      Medium: false,
      Low: false,
    },
    tags:[]
  })

  const uniqueTags = [...new Set((todos || []).flatMap((todo) => todo.tags || []))];

  const [isModalOpen, setIsModalOpen] = useState(false)

  //fetchUsers function to fetch all users from the API
  const fetchUsers = async () => {
    const response = await Service.getAllUsers()
    setUsers(response)
    if (response.length) {
      setSelectedUserId(response[0]._id)
      setSelectedUser(response[0])
    }
  }


  //AddTodo function to add a new todo
  const handleAddTodo = async (newTodo) => {
    try {
      const response = await Service.createTodo(newTodo);
      setTodos((prev) => Array.isArray(prev) ? [...prev, response] : [response]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  //fetchTodos function to fetch all todos from the API
  const fetchTodos = async () => {
    const selectedPriorities = Object.entries(filters.priority)
      .filter(([_, val]) => val)
      .map(([key]) => key);

      const selectedTags = filters.tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.name);

    const response = await Service.getTodos({
      page: currentPage,
      limit: 10,
      user: selectedUserId,
      priority: selectedPriorities,
      search: searchQuery,
      tags: selectedTags,
    });

    setTodos(response);
    setTotalPages(response.totalPages);
  };

  //Fetch todos by ID
  const fetchTodoById = async (id) => {
    try {
      const response = await Service.getTodoById(id)
      setTodoByID(response)
    } catch (error) {
      console.error("Error fetching todo by ID:", error)
    }
  }



  const exportAllTodos = async () => {
    try {
      const response = await Service.exportTodos()
    } catch (error) {
      console.error("Error exporting todos:", error)
    }
  }


  const handleDeleteTodo = async (id) => {
    try {
      await Service.deleteTodoByID(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  const handleUserChange = (userId) => {
    setSelectedUserId(userId)
    const user = users.find((u) => u._id === userId)

    setSelectedUser(user)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [value]: !prev[filterType][value],
      },
    }))
  }

  const handleTodoToggle = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }



  useEffect(() => {
    fetchUsers()
  }, [])
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTodos();
    }, 500); // 500ms delay
  
    return () => clearTimeout(delayDebounce);
  }, [selectedUserId, filters, currentPage, searchQuery]);

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Header
        users={users}
        onExtractCSV={exportAllTodos}
        onUserChange={handleUserChange}
        selectedUserId={selectedUserId}
        selectedUser={selectedUser}
      />
      <div className='flex max-md:flex-col flex-1 bg-gray-100 p-5'>
        <Sidebar filters={filters} onFilterChange={handleFilterChange} uniqueTags={uniqueTags} />

        <main className='flex-1 p-5'>
          <Todolist
            todos={todos}
            todoByID={fetchTodoById}
            onTodoToggle={handleTodoToggle}
            onSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            onAddTodo={handleAddTodo}
            users={users}
            onUpdateTodo={fetchTodos}
            onDeleteTodo={handleDeleteTodo}
          />

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          <TodoByID todo={todoByID} onClose={() => setTodoByID(null)} />
          </main>
      </div>
    </div>
  )
}

export default App

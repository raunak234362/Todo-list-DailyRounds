import React, { useEffect, useState } from 'react'
import Header from "./components/Header"
import Sidebar from './components/Sidebar'
import Todolist from './components/Todolist'
import Pagination from './utils/Pagination'
import Service from './api/Service'

function App() {
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  const [todos, setTodos] = useState([])

  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    priority: {
      high: false,
      medium: false,
      low: false,
    },
  })

  const fetchUsers = async () => {
    const response = await Service.getAllUsers()
    setUsers(response)
    if (response.length) {
      setSelectedUserId(response[0]._id)
      setSelectedUser(response[0])
    }
  }



  const handleAddTodo = (newTodo) => {
    console.log(newTodo)
    try {
      const response = Service.createTodo(newTodo)
      setTodos((prev) => [...prev, response])
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  const fetchTodos = async () => {
    const response = await Service.getTodos()
    setTodos(response)
  }

  const exportAllTodos = async () => {
    try {
      await Service.exportTodos()
    } catch (error) {
      console.error("Error exporting todos:", error)
    }
  }

  // const fetchTodoByID = async (id) => {
  //   const response = await Service.getTodoByID(id)
  //   setTodos((prev) => prev.map((todo) => (todo.id === id ? response : todo)))
  // }

  const handleDeleteTodo = async (id) => {
    try {
      await Service.deleteTodoByID(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchTodos()
  }, [])

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

  const handleTodoToggle = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Filter todos based on selected user
  const filteredTodos = selectedUserId
    ? todos.filter((todo) => todo.assignedUsers && todo.assignedUsers.map(user => user._id).includes(selectedUserId))
    : todos

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
        <Sidebar filters={filters} onFilterChange={handleFilterChange} />

        <main className='flex-1 p-5'>
          <Todolist
            todos={filteredTodos}
            onTodoToggle={handleTodoToggle}
            onSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            onAddTodo={handleAddTodo}
            users={users}
            onDeleteTodo={handleDeleteTodo}
          />

          <Pagination currentPage={currentPage} totalPages={10} onPageChange={handlePageChange} />
        </main>
      </div>
    </div>
  )
}

export default App

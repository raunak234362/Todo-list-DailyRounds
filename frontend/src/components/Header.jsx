import React from 'react'
import { FileText } from "lucide-react"

const Header = ({ users, onUserChange, selectedUserId, selectedUser,onExtractCSV }) => {
    return (
        <header className="border-b border-gray-200 drop-shadow-2xl shadow-amber-50">
            <div className="container mx-auto px-5 py-5 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
                <div className="flex md:flex-row flex-col justify-center items-center gap-4">
                    <button onClick={onExtractCSV} className="flex cursor-pointer items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded-md">
                        <FileText className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                    <div className="flex items-center md:flex-row flex-col gap-2">
                        <div>
                            <select
                                className="bg-gray-200 px-2 py-1 rounded-sm border-none text-gray-700 focus:outline-none focus:ring-0"
                                value={selectedUserId || ""}
                                onChange={(e) => onUserChange(e.target.value)}
                            >
                                {users.map((user, index) => (
                                    <option key={index} value={user.username}>{user.username}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex justify-between items-center gap-2'>
                            <div className="flex items-center gap-2">
                                <span>{selectedUser?.username || "User"}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="sr-only">Profile</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

/* eslint-disable no-unused-vars */
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
const AddTodoForm = ({ users = [], isOpen, onClose, onAddTodo }) => {
    const { register, handleSubmit, control, setValue,reset,formState:{errors} } = useForm()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'notes'
      })
    

    const onSubmit = (data) => {
        console.log(data)
        onAddTodo(data)
        // reset()
        // onClose()
    }
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg md:w-[50vw] w-full">
                <button className=" text-white font-bold rounded-full px-1 bg-red-500 text-xl" onClick={onClose}>
                    &times;
                </button>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-md shadow-md space-y-4">
                    <h2>Add New Todo</h2>
                    <div>
                        <input
                            placeholder="Title"
                            {...register('title', { required: 'Title is required' })}
                            className="w-full border border-gray-300 p-2 rounded-md"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <textarea
                        placeholder="Description"
                        {...register('description')}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />

                    <select
                        {...register('priority')}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <div>
                        <label className="block font-medium mb-1">Assign Users</label>
                        <select
                            multiple
                            {...register('assignedUsers')}
                            onChange={(e) =>
                                setValue(
                                    'assignedUsers',
                                    Array.from(e.target.selectedOptions, (option) => option.value)
                                )
                            }
                            className="w-full border border-gray-300 p-2 rounded-md h-32"
                        >
                            {users?.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        {...register('tags')}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />

                    <div>
                        <label className="block font-medium mb-2">Notes</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2 mb-2">
                                <input
                                    placeholder="Note content"
                                    {...register(`notes.${index}.content`, { required: true })}
                                    className="flex-1 border border-gray-300 p-2 rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ content: '' })}
                            className="bg-blue-200 text-blue-500 font-semibold px-3 py-1 rounded-md"
                        >
                            + Add Note
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-200 text-green-800 font-semibold px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        Create Todo
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddTodoForm

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Service from '../api/Service';
import { useForm } from 'react-hook-form';

const EditTodobyID = ({ users = [], id, onClose  }) => {
  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    tags: [],
  });

  const fetchTodo = async () => {
    try {
      const response = await Service.getTodoById(id);
      const data = response;
      setFormData({
        title: data?.title || '',
        description: data?.description || '',
        priority: data?.priority || 'Low',
        tags: data?.tags || [],
      });
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };
  useEffect(() => {

    fetchTodo();
  }, [id]);


  const handleUpdate = async (data) => {
    const filledData = {
      title: data.title || formData.title,
      description: data.description || formData.description,
      priority: data.priority || formData.priority,
      tags: Array.isArray(data.tags) ? data.tags : formData.tags,
    };
    try {
      await Service.updateTodo(id, filledData);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={formData?.title}
          {...register('title')}
          className="border px-3 py-2 w-full rounded mb-4"
        />

        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={formData?.description}
          {...register('description')}
          className="border px-3 py-2 w-full rounded mb-4"
        />

        <label className="block font-medium mb-1">Priority</label>
        <select
          name="priority"
          defaultValue={formData?.priority}
          {...register('priority')}
          className="border px-3 py-2 w-full rounded mb-4"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="block font-medium mb-1">Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          defaultValue={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
          {...register('tags', { setValueAs: value => value.split(',').map(tag => tag.trim()) })}
          className="border px-3 py-2 w-full rounded mb-4"
        />
        {/* <select
          multiple
          {...register('assignedUsers')}
          className="w-full border border-gray-300 p-2 rounded-md h-32"
        >
          {users?.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select> */}

        <button
          type='submit'
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTodobyID;

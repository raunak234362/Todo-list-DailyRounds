/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Service from '../api/Service';

const EditTodobyID = ({ id, onClose }) => {
  const [todo, setTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    tags: '',
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await Service.getTodoById(id);
        const data = response.data;
        setTodo(data);
        setFormData({
          title: data?.title || '',
          description: data?.description || '',
          priority: data?.priority || 'Low',
          tags: data?.tags?.join(', ') || '', // converting array to string
        });
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    if (id) fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()), // convert back to array
      };
      await Service.updateTodo(id, updatedData);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Todo</h2>

      <label className="block font-medium mb-1">Title</label>
      <input
        type="text"
        name="title"
        value={formData?.title}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded mb-4"
      />

      <label className="block font-medium mb-1">Description</label>
      <textarea
        name="description"
        value={formData?.description}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded mb-4"
      />

      <label className="block font-medium mb-1">Priority</label>
      <select
        name="priority"
        value={formData?.priority}
        onChange={handleChange}
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
        value={formData?.tags}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded mb-4"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditTodobyID;

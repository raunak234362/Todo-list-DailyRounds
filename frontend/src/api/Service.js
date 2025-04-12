import axiosApi from "./axiosApi";

class Service {
  //To get all users
  static async getAllUsers() {
    const response = await axiosApi.get("/users");
    console.log(response.data);
    return response.data;
  }

  //To create a new todo
  static async createTodo(todo) {
    const response = await axiosApi.post("/todos", todo);
    console.log(response.data);
    return response.data;
  }
  
  //To get todo 
  static async getTodos({ page, limit, user, priority, tags }) {
    const params = new URLSearchParams();
  
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (user) params.append('user', user);
    if (priority) params.append('priority', priority);
    if (tags && tags.length) params.append('tags', tags.join(','));
  
    const response = await axiosApi.get(`/todos?${params.toString()}`);
    return response.data;
  }

  //To get todo by ID
  static async getTodoById(id) {
    const response = await axiosApi.get(`/todos/${id}`);
    console.log(response.data);
    return response.data;
  }

  //To update todo by ID
  static async updateTodo(id, updatedtodo) {
    const response = await axiosApi.put(`/todos/${id}`, updatedtodo);
    console.log(response.data);
    return response.data;
  }

  //To delete task by ID
  static async deleteTodoByID(id) {
    const response = await axiosApi.delete(`/todos/${id}`);
    console.log(response.data);
    return response.data;
  }

  //To Extract todos in CSV format
  static async exportTodos() {
    try {
      const response = await axiosApi.get("/todos/export", {
        responseType: "blob",
      });
  
      const url = window.URL.createObjectURL(response.data); // no need for .blob()
  
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "todos.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting todos:", error);
    }
  }
  
}
export default Service;

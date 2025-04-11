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

  //To get todo by ID
  static async getTodos() {
    const response = await axiosApi.get("/todos");
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
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

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


```markdown
# Todo Application

## Overview

This is a simple Todo application built using React for the frontend and Node.js with Express for the backend. The application allows users to manage todos with features like adding, editing, deleting, searching, filtering, and exporting data. 

---

## Features

- **Add Todo**: Users can create new todo items.
- **Edit Todo**: Users can update todo details like title, description, and priority.
- **Delete Todo**: Users can delete existing todo items.
- **Search Todo**: Users can search todos by title and description.
- **Filter Todos**: Users can filter todos based on priority (High, Medium, Low).
- **Export Todos**: Users can export all todos to a CSV file.
- **Pagination**: Todos are paginated for easier browsing.
- **Responsive Design**: The application is fully responsive and works well on different screen sizes.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **CSV Export**: json2csv for exporting todo data in CSV format

---

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (v14.x or higher)
- **MongoDB** (either local or MongoDB Atlas for cloud database)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository_url>
```

### 2. Set Up the Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory and add the following environment variables:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
```

- **MONGO_URI**: Your MongoDB connection string (can be from MongoDB Atlas).
- **JWT_SECRET**: Secret key used for signing JWT tokens.

4. Start the backend server:

```bash
npm start
```

The backend server will now run on `http://localhost:5000`.

### 3. Set Up the Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

The frontend will now run on `http://localhost:3000`.

### 4. Access the Application

- Open your browser and go to `http://localhost:3000`.
- You will be able to use the app to manage your todos.

---

## How It Works

1. **User Authentication**:
   - Users can log in using JWT tokens.
   - Token-based authentication ensures that only authorized users can access the todo management features.

2. **Todo Management**:
   - **Add Todo**: Users can add a new todo by entering details such as title, description, and priority.
   - **Edit Todo**: Users can edit any todo by updating its title, description, or priority.
   - **Delete Todo**: Users can delete a todo item.
   
3. **Search and Filter**:
   - Users can search todos by title or description.
   - Users can filter todos based on priority (High, Medium, Low).

4. **Pagination**:
   - Todos are paginated to improve performance and usability.
   - Pagination is implemented on the backend, allowing for efficient querying of todo data.

5. **Export Todos**:
   - All todos can be exported to a CSV file for offline access or reporting.
   - The CSV includes fields like ID, Title, Description, Priority, Assigned Users, Created At, etc.

---

## Endpoints

The application exposes several API endpoints:

### 1. **GET /todos**
   - Fetch all todos.
   - Supports pagination and filtering by user and priority.
   - Example request: `GET /todos?page=1&limit=10&priority=High`

### 2. **GET /todos/:id**
   - Fetch a single todo by ID.

### 3. **POST /todos**
   - Create a new todo.
   - Example body:
     ```json
     {
       "title": "New Todo",
       "description": "This is a new todo.",
       "priority": "Medium",
       "assignedUsers": ["userId1", "userId2"]
     }
     ```

### 4. **PUT /todos/:id**
   - Update an existing todo by ID.

### 5. **DELETE /todos/:id**
   - Delete a todo by ID.

### 6. **GET /todos/export**
   - Export all todos to a CSV file.

---

## Implementation Details

### Chosen Tech Stack:

- **Frontend**: React and Tailwind CSS were chosen for their performance, flexibility, and ease of development. React's component-based architecture makes it easy to maintain, while Tailwind CSS provides utility-first classes for rapid UI development.
  
- **Backend**: Node.js and Express.js were selected for their scalability and non-blocking I/O capabilities, making them ideal for handling numerous requests.

- **Database**: MongoDB was chosen as the NoSQL database for its flexibility and ease of scaling.

### Running the Application:

- The application is a full-stack Todo manager with user authentication.
- The backend serves the API and handles all CRUD operations for todos.
- The frontend interacts with the API to display and manage todos.

### Assumptions and Design Decisions:

- **MongoDB**: Chosen for its ability to easily scale and handle JSON-like documents.
- **Pagination**: Implemented to improve performance with large datasets.
  
### Additional Features or Improvements:

- **Todo Filtering**: Filtering by priority, tags, and search functionality was added to enhance usability.
- **CSV Export**: A feature to export all todos into a CSV format was added for reporting purposes.
- **Responsive Design**: The application is fully responsive, providing a seamless experience on mobile and desktop devices.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

---

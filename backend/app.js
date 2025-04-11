import express from 'express';
// import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import errorMiddleware from './middleware/error.js';
import cors from "cors";
const app = express();

app.use(express.json());

//enable CORS for all routes
app.use(cors());


//Routes for user management
app.use('/api/users',userRoutes)

//Routes for Todo management
app.use("/api/todos",todoRoutes);

//Middleware for error handling
app.use(errorMiddleware);

export default app;
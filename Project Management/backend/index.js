import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

import pool from './config/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/api/users/",userRoutes)
app.use("/api/projects/",projectRoutes)
app.use("/api/tasks/",taskRoutes)

const port = process.env.PORT || 5001;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    pool.connect();
});

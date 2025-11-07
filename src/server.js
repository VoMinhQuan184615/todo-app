import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();


app.use(express.json());

app.use("/api/tasks",tasksRouter)



const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});


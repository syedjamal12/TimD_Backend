import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';

// Load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();

// CORS configuration
app.use(
  cors({
      origin:[process.env.FRONTED_URL],
      methods:["GET", "POST", "PUT", "DELETE"],
      credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// Your routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;

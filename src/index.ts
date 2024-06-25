import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/ dbConfig';
import userRoutes from './routes/userRoutes';
import {authenticate} from './middleware/authMiddleware';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/worko/user', authenticate, userRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to database
connectDB();

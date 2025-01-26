import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/db.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

dotenv.config();
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const PORT = process.env.PORT || 8080;
// signup and login routes
app.use('/api/v1/user', userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error!' });
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
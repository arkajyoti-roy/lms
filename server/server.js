// server.js
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/db.js';
import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';




dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON and URL encoded data with increased payload limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware to handle cookies
app.use(cookieParser());

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



// Custom Middleware for logging request details (optional for debugging)
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});




// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/media', mediaRoute)
// Error handling middleware



app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(413).json({ message: 'File size exceeds limit. Please upload a smaller file.' });
    } else {
        res.status(500).json({ message: 'Server error!' });
    }
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});

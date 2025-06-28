const express = require('express');
const cors = require('cors');
// const sanitizeHtml = require('sanitize-html');
require('dotenv').config();

const connectDB = require('./config/db');
const routes = require('./router');

// const routes = require('./Routes');

const server = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL; // Define your frontend URL in .env

// CORS Middleware (Allow Only Frontend URL)
server.use(cors({
    origin: [FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ["Content-Type", "Authorization", "x-access-token"]
}));

// Middleware
server.use(express.json());

// Global Input Sanitization Middleware
// server.use((req, res, next) => {
//     if (req.body) {
//         for (let key in req.body) {
//             if (typeof req.body[key] === 'string') {
//                 req.body[key] = sanitizeHtml(req.body[key], {
//                     allowedTags: [],
//                     allowedAttributes: {}
//                 });
//             }
//         }
//     }
//     next();
// });

// Test Route
server.get('/', (req, res) => {
    res.send('Store API is running...');
});

// API Routes
server.use('/api', routes);

// Routes
// server.use(routes);

// Start Server
server.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Connect to MongoDB
    await connectDB();
});

// Export the app module
module.exports = server;
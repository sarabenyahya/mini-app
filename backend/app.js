const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const employeeRouter = require('./routes/employeeRouter');
const userRouter = require('./routes/userRouter');
const { isAuthenticated } = require('./middlewares/AuthMiddleware');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

// Middleware
app.use(express.json());

app.use(require('cors')({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));


// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret_key_change_in_production',
    resave: false,
    saveUninitialized: false,
    
    
    
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Bienvenue dans mon api');
});

// Route protection
app.use('/api/employees', isAuthenticated, employeeRouter);
app.use('/api/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
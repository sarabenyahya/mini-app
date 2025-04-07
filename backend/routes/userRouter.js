const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middlewares/AuthMiddleware');
const UserModel = require('../models/User');

// Public routes
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

// Protected routes - Admin only
router.get('/', isAuthenticated, UserController.getAllUsers);
router.get('/:id', isAuthenticated, UserController.getUserById);
router.post('/', isAuthenticated, isAdmin, UserController.addUser);
router.put('/:id', isAuthenticated, isAdmin, UserController.updateUser);
router.delete('/:id', isAuthenticated, isAdmin, UserController.deleteUser);
router.get('/check-session', UserController.checkSession);

router.post('/addSuperUser', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const newUser = await UserModel.addUser({
            email,
            password,
            firstName,
            lastName,
            isAdmin: true
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
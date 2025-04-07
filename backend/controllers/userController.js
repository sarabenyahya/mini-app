const UserService = require('../services/UserService');
const mongoose = require('mongoose');

class UserController {
    static async login(req, res) {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis' });
        }
        
        try {
            const user = await UserService.authenticateUser(email, password);
            
            if (!user) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
            }
            
            // Set session
            req.session.user = {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            };
            
            res.json({ 
                message: 'Connexion réussie',
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.json({ message: 'Déconnexion réussie' });
        });
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        const id = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID non valide' });
        }

        try {
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addUser(req, res) {
        const { email, password, firstName, lastName, isAdmin } = req.body;
        
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'Données incomplètes' });
        }
        
        try {
            // Check if user already exists
            const existingUser = await UserService.getUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'Cet email est déjà utilisé' });
            }
            
            const userData = { email, password, firstName, lastName };
            if (isAdmin !== undefined) {
                userData.isAdmin = isAdmin;
            }
            
            const newUser = await UserService.addUser(userData);
            
            // Don't return the password in the response
            const userResponse = {
                _id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                isAdmin: newUser.isAdmin,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            };
            
            res.status(201).json(userResponse);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateUser(req, res) {
        const id = req.params.id;
        const updates = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID non valide' });
        }
        
        try {
            const updatedUser = await UserService.updateUser(id, updates);
            if (!updatedUser) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteUser(req, res) {
        const id = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID non valide' });
        }
        
        try {
            const deletedUser = await UserService.deleteUser(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async checkSession(req, res) {
        
        if (req.session.user) {
            const user = await UserService.getUserById(req.session.user.id);
            return res.json({
                authenticated: true,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin
                }
            });
        }
        res.json({ authenticated: false });
    }
}

module.exports = UserController;
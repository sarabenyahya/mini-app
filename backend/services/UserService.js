const User = require('../models/User');

class UserService {
    static getAllUsers() {
        return User.getAllUsers();
    }

    static getUserById(id) {
        return User.getUserById(id);
    }

    static getUserByEmail(email) {
        return User.getUserByEmail(email);
    }

    static addUser(user) {
        return User.addUser(user);
    }

    static updateUser(id, userData) {
        return User.updateUser(id, userData);
    }

    static deleteUser(id) {
        return User.deleteUser(id);
    }

    static async authenticateUser(email, password) {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return null;
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return null;
        }
        
        // Don't return the password
        const userObj = user.toObject();
        delete userObj.password;
        return userObj;
    }
}

module.exports = UserService;
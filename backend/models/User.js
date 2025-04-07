const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for User
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email est obligatoire'], 
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, 'Mot de passe est obligatoire'] 
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    firstName: { 
        type: String,
        required: [true, 'Prénom est obligatoire']
    },
    lastName: { 
        type: String,
        required: [true, 'Nom est obligatoire']
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it's modified or new
    if (!this.isModified('password')) return next();
    
    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create a model for User
const User = mongoose.model('User', userSchema);

// Expose methods to interact with the database
class UserModel {
    static async getAllUsers() {
        return await User.find().select('-password');
    }

    static async getUserById(id) {
        return await User.findById(id).select('-password');
    }

    static async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    static async addUser(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }

    static async updateUser(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
    }

    static async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = UserModel;
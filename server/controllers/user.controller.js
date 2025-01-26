import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

// Sign up
export const signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists by email or phone number
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or phone number already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id, res);

        res.status(201).json({ token, message: 'User created and logged in successfully', user: { name: newUser.name } });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Check if user exists by email or phone number
        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Log the fetched user for debugging
        console.log('Fetched User:', user);

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id, res);

        res.status(200).json({ token, message: 'Login successful', user: { name: user.name } });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

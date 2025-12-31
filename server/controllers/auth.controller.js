const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            full_name: req.body.full_name,
            email: req.body.email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        
        res.json({ token, user: { id: user._id, name: user.full_name, email: user.email } });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.json({ token, user: { id: user._id, name: user.full_name, email: user.email } });
    } catch (err) {
        res.status(500).json(err);
    }
};
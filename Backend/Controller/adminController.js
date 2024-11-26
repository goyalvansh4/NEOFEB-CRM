const Admin = require('../Models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const secret_key = process.env.SECRET_KEY;

const handleRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 12);
        const admin = await Admin.create({ email, password:passwordHash });
        const token = jwt.sign({ userId: admin._id
        },secret_key, {
            expiresIn: '1h'
        });
        res.status(201).json({ status:"success",token:token , message: 'Admin created successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status:"error",message: 'Something went wrong' });
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: admin._id }, secret_key, {
            expiresIn: '1h'
        });
        res.status(200).json({ status:"success",token: token, message: 'Admin logged in successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}



module.exports = { 
  handleRegister,
  handleLogin 
};
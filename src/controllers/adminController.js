import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// 📌 Register Admin (Hanya Bisa 1 Admin)
export const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek apakah admin sudah ada
        const existingAdmin = await Admin.findOne({});
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin sudah terdaftar!' });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat admin baru
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: 'Admin berhasil didaftarkan!' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

// 📌 Login Admin
export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek apakah admin ada di database
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Username atau password salah!' });
        }

        // Cek password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Username atau password salah!' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login berhasil!', token });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }
};

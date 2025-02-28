import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// 📌 Koneksi ke MongoDB
connectDB();

// 📌 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 📌 Routes
app.use('/api/admin', adminRoutes);

// 📌 Tes endpoint
app.get('/', (req, res) => {
    res.send('Server berjalan dengan baik 🚀');
});

// 📌 Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

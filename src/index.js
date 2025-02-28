import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// 📌 koneksi ke MongoDB
connectDB();

// 📌 middleware
//app.use(express.json()); // untuk parsing json
//app.use(express.urlencoded({ extended: true })); //untuk menerima dari form HTML
app.use(cors()); // agar bisa diakses dari luar domain

// Tes respone
app.get('/', (req, res) => {
    res.send('tes okey')
  })

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
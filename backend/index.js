// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const catatanRoutes = require("./routes/catatanRoutes");
const path = require("path");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Izinkan origin frontend lokal yang umum dipakai saat development
app.use(cors({
  origin: ['http://localhost', 'http://localhost:5173', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Route dasar untuk testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Setting Routes
require("./schema/Catatan"); // Untuk generate Tabel catatan
app.use("/api/catatan", catatanRoutes); // Untuk setting routes catatan

// Serve frontend untuk route lainnya
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Sync Database dan Jalankan Server
const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("✅ Database synced");
  app.listen(port, () => {
    console.log(`🚀 Server berjalan di http://localhost:${port}`);
    console.log(`📝 API tersedia di http://localhost:${port}/api/catatan`);
  });
});

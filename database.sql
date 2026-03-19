-- =============================================
-- Database Setup untuk Aplikasi Notes
-- =============================================

-- Buat database
CREATE DATABASE IF NOT EXISTS notes_app;

-- Gunakan database
USE notes_app;

-- Buat tabel catatan
CREATE TABLE IF NOT EXISTS catatan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    isi TEXT NOT NULL,
    tanggal_dibuat DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert beberapa data contoh
INSERT INTO catatan (judul, isi) VALUES
('Catatan Pertama', 'Ini adalah catatan pertama saya. Selamat datang di aplikasi Notes!'),
('Belajar Express.js', 'Express.js adalah framework web untuk Node.js yang minimalis dan fleksibel.'),
('Daftar Belanja', 'Susu, Roti, Telur, Sayur, Buah-buahan, Minyak goreng');

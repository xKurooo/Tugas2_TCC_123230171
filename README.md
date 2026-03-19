# 📝 My Notes - Aplikasi Catatan

Aplikasi catatan fullstack dengan Express.js, MySQL, dan vanilla HTML/CSS/JS.

## Prasyarat

- [Node.js](https://nodejs.org/) (v14+)
- [MySQL](https://dev.mysql.com/downloads/) (v5.7+)

## Cara Menjalankan

### 1. Setup Database

Jalankan file SQL di MySQL:

```bash
mysql -u root -p < backend/database.sql
```

Atau buka MySQL client dan jalankan isi file `backend/database.sql` secara manual.

### 2. Konfigurasi Database

Edit file `backend/server.js`, sesuaikan kredensial MySQL:

```javascript
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',        // sesuaikan username MySQL kamu
    password: '',         // sesuaikan password MySQL kamu
    database: 'notes_app'
});
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Jalankan Server

```bash
node server.js
```

### 5. Buka Aplikasi

Buka browser dan akses: [http://localhost:3000](http://localhost:3000)

## Fitur

- ✅ Tambah catatan baru
- ✅ Lihat daftar catatan (grid view)
- ✅ Edit catatan
- ✅ Hapus catatan (dengan konfirmasi)
- ✅ Cari catatan
- ✅ Responsive design

## Teknologi

| Layer    | Teknologi           |
|----------|---------------------|
| Frontend | HTML, CSS, JS       |
| Backend  | Express.js (Node.js)|
| Database | MySQL               |

## API Endpoints

| Method | Endpoint          | Fungsi              |
|--------|-------------------|----------------------|
| GET    | /api/catatan      | Ambil semua catatan  |
| GET    | /api/catatan/:id  | Ambil catatan by ID  |
| POST   | /api/catatan      | Tambah catatan baru  |
| PUT    | /api/catatan/:id  | Edit catatan         |
| DELETE | /api/catatan/:id  | Hapus catatan        |

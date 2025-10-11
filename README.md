# OpenMusic API V2

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://openmusic-v2.asah-app.hamdiv.me/)

**Proyek: Open Music API Versi 2**

OpenMusic API V2 adalah aplikasi back-end untuk mengelola data musik dengan fitur lengkap termasuk autentikasi pengguna, manajemen playlist, dan kolaborasi. API ini dibangun menggunakan Node.js dengan framework Hapi.js dan PostgreSQL sebagai database.

## ✨ Fitur Utama

- **Semua Fitur V1**
- **Registrasi & Autentikasi**: Sistem login dengan JWT token
- **Manajemen Playlist**: Membuat dan mengelola playlist pribadi
- **Kolaborasi Playlist**: Menambah kolaborator untuk berbagi playlist
- **Playlist Activities**: Riwayat aktivitas playlist
- **Authorization**: Kontrol akses berdasarkan ownership dan kolaborasi
- **Refresh Token**: Sistem refresh token untuk keamanan

## 🛠️ Teknologi yang Digunakan

- **Node.js** - Runtime JavaScript
- **Hapi.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Autentikasi
- **Joi** - Validasi data
- **bcrypt** - Hashing password
- **nanoid** - ID generator

## 📚 API Endpoints

### 🎵 Albums

- `POST /albums` - Menambah album baru
- `GET /albums/{id}` - Mendapatkan detail album (dengan daftar lagu)
- `PUT /albums/{id}` - Memperbarui album
- `DELETE /albums/{id}` - Menghapus album

### 🎶 Songs

- `POST /songs` - Menambah lagu baru
- `GET /songs` - Mendapatkan daftar lagu (dengan query parameter title dan performer)
- `GET /songs/{id}` - Mendapatkan detail lagu
- `PUT /songs/{id}` - Memperbarui lagu
- `DELETE /songs/{id}` - Menghapus lagu

### 👥 Users

- `POST /users` - Registrasi pengguna baru
- `GET /users/{id}` - Mendapatkan detail pengguna
- `GET /users` - Mencari pengguna berdasarkan username

### 🔐 Authentications

- `POST /authentications` - Login pengguna
- `PUT /authentications` - Refresh access token
- `DELETE /authentications` - Logout pengguna

### 📝 Playlists (Memerlukan Autentikasi)

- `POST /playlists` - Membuat playlist baru
- `GET /playlists` - Mendapatkan daftar playlist milik pengguna
- `DELETE /playlists/{id}` - Menghapus playlist
- `POST /playlists/{id}/songs` - Menambah lagu ke playlist
- `GET /playlists/{id}/songs` - Mendapatkan daftar lagu dalam playlist
- `DELETE /playlists/{id}/songs` - Menghapus lagu dari playlist
- `GET /playlists/{id}/activities` - Mendapatkan riwayat aktivitas playlist

### 🤝 Collaborations (Memerlukan Autentikasi)

- `POST /collaborations` - Menambah kolaborator ke playlist
- `DELETE /collaborations` - Menghapus kolaborator dari playlist Aplikasi ini merupakan submission pertama untuk kelas **Belajar Fundamental Back-End dengan JavaScript** dengan implementasi CRUD operations, database integration, validasi data, dan fitur pencarian.

## 🌟 Fitur Utama

### 🎵 Manajemen Album

- ➕ **Tambah Album** - Menambahkan album baru ke dalam koleksi
- 📀 **Detail Album** - Melihat informasi lengkap album beserta daftar lagu
- ✏️ **Edit Album** - Mengubah informasi album yang sudah ada
- 🗑️ **Hapus Album** - Menghapus album dari koleksi

### 🎶 Manajemen Lagu

- ➕ **Tambah Lagu** - Menambahkan lagu baru ke dalam koleksi
- 🎵 **Lihat Semua Lagu** - Menampilkan daftar semua lagu dengan filtering
- 🔍 **Detail Lagu** - Melihat informasi lengkap lagu berdasarkan ID
- ✏️ **Edit Lagu** - Mengubah informasi lagu yang sudah ada
- 🗑️ **Hapus Lagu** - Menghapus lagu dari koleksi

### 🔍 Filtering & Pencarian

- 🏷️ **Search by Title** - Mencari lagu berdasarkan judul
- 🎤 **Search by Performer** - Mencari lagu berdasarkan performer
- 🔄 **Combined Search** - Kombinasi pencarian title dan performer

### 🛡️ Validasi Data & Error Handling

- ✔️ **Input Validation** - Validasi semua input data menggunakan Joi
- 🚫 **Error Handling** - Penanganan error yang comprehensive
- 📝 **Response Format** - Format response yang konsisten
- 🗄️ **Database Integration** - Penyimpanan data menggunakan PostgreSQL

## 🛠️ Teknologi yang Digunakan

- **Hapi.js 21.3.2** - Framework web untuk Node.js
- **PostgreSQL** - Database relational untuk penyimpanan data
- **Node.js** - Runtime environment JavaScript
- **Joi** - Schema validation untuk JavaScript
- **nanoid** - Generator ID unik untuk album dan lagu
- **node-pg-migrate** - Database migration tool
- **pg** - PostgreSQL client untuk Node.js
- **dotenv** - Environment variable management
- **ESLint** - Linting tool untuk code quality
- **Docker** - Containerization platform

## 📦 Instalasi & Menjalankan

### 🐳 Menggunakan Docker (Recommended)

1. **Clone repository:**

```bash
git clone <repository-url>
cd openmusic-v1
```

2. **Jalankan dengan Docker Compose:**

```bash
docker-compose up --build
```

3. **Server akan berjalan di:**

```
http://localhost:5000
```

### 💻 Instalasi Manual

1. **Clone repository:**

```bash
git clone <repository-url>
cd openmusic-v1
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup database PostgreSQL dan buat database `openmusicdb`**

4. **Copy file `.env` dan sesuaikan konfigurasi database:**

```env
HOST=localhost
PORT=5000
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=openmusicdb
PGHOST=localhost
PGPORT=5432
```

5. **Jalankan migrations:**

```bash
npm run migrate up
```

6. **Jalankan server:**

```bash
npm start
```

7. **Server akan berjalan di:**

```
http://localhost:5000
```

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites

- Node.js (v14 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- npm atau yarn

### 1. Clone Repository

```bash
git clone <repository-url>
cd openmusic-v2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

1. Buat database PostgreSQL baru dengan nama `openmusicv2`
2. Salin file `.env.example` menjadi `.env`
3. Sesuaikan konfigurasi database di file `.env`

### 4. Jalankan Migration

```bash
npm run migrate up
```

### 5. Jalankan Aplikasi

#### Development Mode

```bash
npm run start:dev
```

#### Production Mode

```bash
npm run start:prod
```

Aplikasi akan berjalan di `http://localhost:5000`

## 🔧 Environment Variables

Buat file `.env` berdasarkan `.env.example` dan sesuaikan dengan konfigurasi Anda:

```env
# Server Configuration
HOST=localhost
PORT=5000

# Database Configuration
PGUSER=your_db_user
PGHOST=localhost
PGPASSWORD=your_db_password
PGDATABASE=openmusicv2
PGPORT=5432

# JWT Configuration
ACCESS_TOKEN_KEY=your_super_secret_access_token_key
REFRESH_TOKEN_KEY=your_super_secret_refresh_token_key
ACCESS_TOKEN_AGE=1800
```

## 📋 Database Schema

### Tables

- **albums**: Menyimpan data album musik
- **songs**: Menyimpan data lagu dengan relasi ke album
- **users**: Menyimpan data pengguna terdaftar
- **authentications**: Menyimpan refresh token aktif
- **playlists**: Menyimpan data playlist dengan relasi ke owner
- **playlist_songs**: Tabel junction untuk relasi playlist dan lagu
- **collaborations**: Menyimpan data kolaborator playlist
- **playlist_song_activities**: Menyimpan riwayat aktivitas playlist

### Foreign Key Relationships

- `songs.album_id` → `albums.id`
- `playlists.owner` → `users.id`
- `playlist_songs.playlist_id` → `playlists.id`
- `playlist_songs.song_id` → `songs.id`
- `collaborations.playlist_id` → `playlists.id`
- `collaborations.user_id` → `users.id`
- `playlist_song_activities.playlist_id` → `playlists.id`
- `playlist_song_activities.user_id` → `users.id`

## 🔐 Autentikasi

API menggunakan JWT (JSON Web Token) untuk autentikasi. Untuk mengakses endpoint yang memerlukan autentikasi, sertakan token di header:

```
Authorization: Bearer <your_access_token>
```

### Flow Autentikasi

1. **Register**: `POST /users` dengan username, password, dan fullname
2. **Login**: `POST /authentications` dengan username dan password
3. **Gunakan Access Token**: Sertakan token di header untuk endpoint yang memerlukan auth
4. **Refresh Token**: `PUT /authentications` dengan refresh token saat access token expired
5. **Logout**: `DELETE /authentications` dengan refresh token

## 📊 Response Format

### Success Response

```json
{
  "status": "success",
  "message": "Optional success message",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "status": "fail", // atau "error" untuk server error
  "message": "Error message"
}
```

## 🧪 Testing

Gunakan collection Postman yang disediakan untuk testing API:

- `Open Music API V1 Test.postman_collection.json`
- `OpenMusic API Test.postman_environment.json`

Atau jalankan test dengan Newman:

```bash
newman run "Open Music API V1 Test.postman_collection.json" --environment "OpenMusic API Test.postman_environment.json"
```

## 🎯 Kriteria yang Dipenuhi

### ✅ Kriteria Wajib

1. **Registrasi dan Autentikasi Pengguna** - JWT dengan refresh token
2. **Pengelolaan Data Playlist** - CRUD playlist dengan otorisasi
3. **Foreign Key Implementation** - Relasi antar tabel dengan foreign key
4. **Data Validation** - Validasi komprehensif dengan Joi
5. **Error Handling** - Status code dan response sesuai spesifikasi
6. **Fitur V1 Dipertahankan** - Semua fitur V1 tetap berfungsi

### ✅ Kriteria Opsional

1. **Kolaborator Playlist** - Fitur kolaborasi lengkap
2. **Playlist Activities** - Riwayat aktivitas playlist
3. **Fitur V1 Opsional** - Query parameter dan album detail

## 🛡️ Security Features

- **Password Hashing**: Menggunakan bcrypt dengan salt rounds 10
- **JWT Security**: Access token dan refresh token terpisah
- **Input Validation**: Validasi ketat pada semua input
- **Authorization**: Kontrol akses berdasarkan ownership dan kolaborasi
- **SQL Injection Protection**: Menggunakan parameterized queries

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

**Ilham Maulana**

- Mahasiswa Tingkat 4, Semester 7
- Kelas: Belajar Fundamental Back-End dengan JavaScript
- Submission: OpenMusic API versi 1

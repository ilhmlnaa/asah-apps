# 🎧 OpenMusic API V3

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://openmusic-v3.asah-app.hamdiv.me/)

**Proyek: Open Music API Versi 3**

OpenMusic API V3 adalah aplikasi back-end untuk mengelola data musik dengan fitur lengkap termasuk ekspor playlist, upload cover album, like album, dan server-side caching. API ini dibangun menggunakan Node.js dengan framework Hapi.js dan PostgreSQL sebagai database.

## ✨ Fitur Utama

- **Semua Fitur V1 & V2** - Backward compatibility terjaga
- **Ekspor Playlist**: Ekspor data playlist via email menggunakan RabbitMQ
- **Upload Cover Album**: Upload sampul album dengan validasi MIME type
- **Like Album**: Sistem menyukai album dengan autentikasi
- **Server-Side Cache**: Redis caching untuk performa optimal
- **Registrasi & Autentikasi**: Sistem login dengan JWT token
- **Manajemen Playlist**: Membuat dan mengelola playlist pribadi
- **Kolaborasi Playlist**: Menambah kolaborator untuk berbagi playlist
- **Playlist Activities**: Riwayat aktivitas playlist
- **Authorization**: Kontrol akses berdasarkan ownership dan kolaborasi
- **Refresh Token**: Sistem refresh token untuk keamanan

---

## 🗂️ Struktur Monorepo

```
.
├── openmusicv3-app      # Backend utama menggunakan Hapi.js
├── openmusicv3-consumer # Consumer untuk menangani ekspor playlist
├── postman              # File testing untuk Postman
└── README.md            # Dokumentasi utama
```

- **openmusicv3-app** → Menyediakan REST API untuk manajemen user, playlist, dan lagu.
- **openmusicv3-consumer** → Mendengarkan queue `export:playlists` untuk mengirim playlist ke email dalam format JSON.
- **postman** → Berisi collection dan environment untuk testing API menggunakan Postman.

---

## 🛠️ Teknologi yang Digunakan

- **Node.js** - Runtime JavaScript
- **Hapi.js** - Web framework
- **PostgreSQL** - Database
- **Redis** - Caching layer
- **RabbitMQ** - Message broker
- **JWT** - Autentikasi
- **Joi** - Validasi data
- **bcrypt** - Hashing password
- **nanoid** - ID generator
- **Nodemailer** - Email service
- **AWS SDK** - Cloud storage (opsional)

---

## 🛠️ Persiapan Awal

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ilhmlnaa/asah-apps.git
git checkout submission-be4-openmusic-api-v3
```

### 2️⃣ Install Dependencies

Masuk ke folder masing-masing service dan install dependencies:

```bash
cd openmusicv3-app
npm install

cd ../openmusicv3-consumer
npm install
```

### 3️⃣ Siapkan Environment Variables

Salin file `.env.example` ke `.env` di masing-masing folder dan sesuaikan konfigurasinya.

```bash
cp .env.example .env
```

---

## 🧰 Menjalankan Proyek

### 🌐 Jalankan Service Utama (App)

Masuk ke folder `openmusicv3-app`:

```bash
cd openmusicv3-app
npm run start:dev
```

Server akan berjalan di:  
➡️ **http://localhost:5000**

### 📨 Jalankan Consumer

Masuk ke folder `openmusicv3-consumer`:

```bash
cd openmusicv3-consumer
npm run start:dev
```

Consumer akan otomatis mendengarkan queue `export:playlists` dari RabbitMQ.

### 🐳 Menjalankan dengan Docker (Recomended)

Jika ingin menjalankan seluruh stack menggunakan Docker:

```bash
docker-compose up --build
```

Pastikan jalankan di root directory dan cek kembali file `docker-compose.yml` apakah sudah terkonfigurasi untuk:

- App
- Consumer
- PostgreSQL
- RabbitMQ

---

## 🧪 Testing

Gunakan collection Postman yang disediakan untuk testing API:

- `postman/Open Music API V3 Test.postman_collection.json`
- `postman/OpenMusic API Test.postman_environment.json`

## 📜 Lisensi

This project is licensed under the MIT License.

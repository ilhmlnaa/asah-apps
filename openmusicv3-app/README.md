# 💻 OpenMusic API V3 APP

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


## 🗂️ Struktur Project

```
openmusicv3-app/
├── migrations/                   # Database migrations
├── src/                           # Source code
│   ├── api/                       # API handlers & routes
│   │   ├── albums/               # Album endpoints
│   │   ├── authentications/      # Auth endpoints
│   │   ├── collaborations/       # Collaboration endpoints
│   │   ├── exports/              # Export playlist endpoints
│   │   ├── playlists/            # Playlist endpoints
│   │   ├── songs/                # Song endpoints
│   │   ├── uploads/              # File upload endpoints
│   │   └── users/                # User endpoints
│   ├── exceptions/               # Custom error classes
│   ├── service/                  # Business logic services
│   │   ├── postgres/            # Database services
│   │   ├── rabbitmq/            # Message broker services
│   │   ├── redis/               # Caching services
│   │   └── storage/             # File storage services
│   ├── tokenize/                # JWT token management
│   ├── utils/                   # Utility functions
│   ├── validator/               # Request validation schemas
│   └── server.js                # Main server file
├── docker-compose.yml           # Docker compose configuration
├── docker-entrypoint.sh         # Docker entrypoint script
├── Dockerfile                   # Docker image configuration
├── package.json                 # NPM dependencies & scripts
└── README.md                    # Project documentation
```

---

## 📚 API Endpoints

### 🎵 Albums

- `POST /albums` - Menambah album baru
- `GET /albums/{id}` - Mendapatkan detail album (dengan daftar lagu dan coverUrl)
- `PUT /albums/{id}` - Memperbarui album
- `DELETE /albums/{id}` - Menghapus album
- `POST /albums/{id}/covers` - Upload cover album (max 512KB, image MIME types)
- `POST /albums/{id}/likes` - Menyukai album (perlu autentikasi)
- `DELETE /albums/{id}/likes` - Batal menyukai album (perlu autentikasi)
- `GET /albums/{id}/likes` - Melihat jumlah yang menyukai album

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
- `DELETE /collaborations` - Menghapus kolaborator dari playlist

### 📤 Exports (Memerlukan Autentikasi)

- `POST /export/playlists/{playlistId}` - Ekspor playlist ke email (hanya owner playlist)

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

### Prerequisites

- Node.js (v14 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- Redis (v7)
- RabbitMQ (v8)
- AWS OR MINIO FOR S3 SUPPORT
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

1. Buat database PostgreSQL baru dengan nama `openmusicv3`
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

# Message broker (RabbitMQ)
RABBITMQ_SERVER=

# Redis
REDIS_SERVER=
REDIS_PORT=
REDIS_PASSWORD=

# Storage Provider (aws or minio choose one!)
STORAGE_PROVIDER=minio # optional, default is 'aws'
AWS_ACCESS_KEY_ID=access-key
AWS_SECRET_ACCESS_KEY=secret-access-key
AWS_REGION=region
AWS_BUCKET_NAME=bucket-name
AWS_ENDPOINT= # optional, for MINIO or custom S3 provider only!
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

- `Open Music API V3 Test.postman_collection.json`
- `OpenMusic API Test.postman_environment.json`

## 🎯 Kriteria yang Dipenuhi

### ✅ Kriteria Wajib

1. **Ekspor Lagu Pada Playlist** - Fitur ekspor data playlist ke email menggunakan message broker RabbitMQ
2. **Mengunggah Sampul Album** - Upload cover album dengan validasi MIME type dan ukuran file maksimal 512KB
3. **Menyukai Album** - Sistem like/unlike album dengan autentikasi dan cache Redis
4. **Menerapkan Server-Side Cache** - Implementasi Redis caching untuk endpoint yang sering diakses
5. **Pertahankan Fitur OpenMusic API versi 2 dan 1** - Backward compatibility dengan semua fitur V1 dan V2

## 🛡️ Security Features

- **Password Hashing**: Menggunakan bcrypt dengan salt rounds 10
- **JWT Security**: Access token dan refresh token terpisah
- **Input Validation**: Validasi ketat pada semua input
- **Authorization**: Kontrol akses berdasarkan ownership dan kolaborasi
- **SQL Injection Protection**: Menggunakan parameterized queries

## 📝 License

This project is licensed under the MIT License. **© Ilham**


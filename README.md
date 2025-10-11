# OpenMusic API v1

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://openmusic-v1.asah-app.hamdiv.me/)

**Proyek: Open Music API Versi 1**

OpenMusic API V1 adalah RESTful API untuk mengelola data album dan lagu musik yang dibuat menggunakan framework Hapi.js dan PostgreSQL. Aplikasi ini merupakan submission pertama untuk kelas **Belajar Fundamental Back-End dengan JavaScript** dengan implementasi CRUD operations, database integration, validasi data, dan fitur pencarian.

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

## 🚀 Scripts yang Tersedia

- `npm start` - Menjalankan server production
- `npm run start:dev` - Menjalankan server dengan nodemon untuk development
- `npm run migrate` - Menjalankan migrations
- `npm run lint` - Menjalankan ESLint untuk mengecek kode
- `npm run lint:fix` - Memperbaiki ESLint errors

### 🐳 Docker Commands

- `docker-compose up --build` - Build dan jalankan aplikasi dengan database
- `docker-compose down` - Stop dan hapus containers
- `docker-compose logs` - Lihat logs aplikasi
- `docker build -t openmusic-api .` - Build Docker image

## 🔌 API Endpoints

### 📀 Menambah Album

- **Method**: `POST`
- **URL**: `/albums`
- **Body Request**:

```json
{
  "name": "string",
  "year": "number"
}
```

- **Response Success** (201):

```json
{
  "status": "success",
  "data": {
    "albumId": "album-Mk8AnmCp210PwT6B"
  }
}
```

### 🔍 Menampilkan Detail Album

- **Method**: `GET`
- **URL**: `/albums/{id}`
- **Response Success** (200):

```json
{
  "status": "success",
  "data": {
    "album": {
      "id": "album-Mk8AnmCp210PwT6B",
      "name": "Viva la Vida",
      "year": 2008,
      "songs": [
        {
          "id": "song-Qbax5Oy7L8WKf74l",
          "title": "Life in Technicolor",
          "performer": "Coldplay"
        }
      ]
    }
  }
}
```

### ✏️ Mengubah Data Album

- **Method**: `PUT`
- **URL**: `/albums/{id}`
- **Body Request**: JSON dengan properti yang ingin diubah
- **Response Success** (200):

```json
{
  "status": "success",
  "message": "Album berhasil diperbarui"
}
```

### 🗑️ Menghapus Album

- **Method**: `DELETE`
- **URL**: `/albums/{id}`
- **Response Success** (200):

```json
{
  "status": "success",
  "message": "Album berhasil dihapus"
}
```

### 🎵 Menambah Lagu

- **Method**: `POST`
- **URL**: `/songs`
- **Body Request**:

```json
{
  "title": "string",
  "year": "number",
  "genre": "string",
  "performer": "string",
  "duration": "number",
  "albumId": "string"
}
```

- **Response Success** (201):

```json
{
  "status": "success",
  "data": {
    "songId": "song-Qbax5Oy7L8WKf74l"
  }
}
```

### 🎶 Menampilkan Semua Lagu

- **Method**: `GET`
- **URL**: `/songs`
- **Query Parameters** (opsional):

  - `title`: Filter lagu berdasarkan judul
  - `performer`: Filter lagu berdasarkan performer

- **Response Success** (200):

```json
{
  "status": "success",
  "data": {
    "songs": [
      {
        "id": "song-Qbax5Oy7L8WKf74l",
        "title": "Life in Technicolor",
        "performer": "Coldplay"
      }
    ]
  }
}
```

### 🔍 Menampilkan Detail Lagu

- **Method**: `GET`
- **URL**: `/songs/{id}`
- **Response Success** (200):

```json
{
  "status": "success",
  "data": {
    "song": {
      "id": "song-Qbax5Oy7L8WKf74l",
      "title": "Life in Technicolor",
      "year": 2008,
      "performer": "Coldplay",
      "genre": "Indie",
      "duration": 120,
      "albumId": "album-Mk8AnmCp210PwT6B"
    }
  }
}
```

### ✏️ Mengubah Data Lagu

- **Method**: `PUT`
- **URL**: `/songs/{id}`
- **Body Request**: JSON dengan properti yang ingin diubah
- **Response Success** (200):

```json
{
  "status": "success",
  "message": "Lagu berhasil diperbarui"
}
```

### 🗑️ Menghapus Lagu

- **Method**: `DELETE`
- **URL**: `/songs/{id}`
- **Response Success** (200):

```json
{
  "status": "success",
  "message": "Lagu berhasil dihapus"
}
```

## 📁 Struktur Project

```
openmusic-v1/
├── src/
│   ├── api/
│   │   ├── albums/
│   │   │   ├── handler.js       # Request handlers untuk album endpoints
│   │   │   ├── index.js         # Plugin registration untuk albums
│   │   │   └── routes.js        # Route definitions untuk albums
│   │   └── songs/
│   │       ├── handler.js       # Request handlers untuk song endpoints
│   │       ├── index.js         # Plugin registration untuk songs
│   │       └── routes.js        # Route definitions untuk songs
│   ├── exceptions/
│   │   ├── ClientError.js       # Base client error class
│   │   ├── InvariantError.js    # Validation error class
│   │   └── NotFoundError.js     # Not found error class
│   ├── service/
│   │   └── postgres/
│   │       ├── AlbumsService.js # Database service untuk albums
│   │       └── SongsService.js  # Database service untuk songs
│   ├── utils/
│   │   └── index.js            # Utility functions untuk mapping data
│   ├── validator/
│   │   ├── albums/
│   │   │   ├── index.js        # Albums validator
│   │   │   └── schema.js       # Joi schema untuk albums
│   │   └── songs/
│   │       ├── index.js        # Songs validator
│   │       └── schema.js       # Joi schema untuk songs
│   └── server.js               # Server configuration dan startup
├── migrations/
│   ├── 1760010321717_create-table-albums.js  # Migration untuk tabel albums
│   └── 1760010321718_create-table-songs.js   # Migration untuk tabel songs
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose configuration
├── .dockerignore              # Docker ignore file
├── .eslintrc.json             # ESLint configuration
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── package.json               # Dependencies dan scripts
├── README.md                  # Project documentation
└── healthcheck.js             # Health check script untuk Docker
```

## 🔧 Validasi & Error Handling

### Input Validation

#### Albums

- `name` wajib diisi (string)
- `year` wajib diisi (number, 1900-2030)

#### Songs

- `title` wajib diisi (string)
- `year` wajib diisi (number, 1900-2030)
- `genre` wajib diisi (string)
- `performer` wajib diisi (string)
- `duration` opsional (number, positive)
- `albumId` opsional (string)

### Error Responses

- **400 Bad Request**: Data input tidak valid
- **404 Not Found**: Album/Lagu tidak ditemukan
- **500 Internal Server Error**: Server error

## 🧪 Testing

Proyek ini dapat ditest menggunakan tools seperti Postman atau curl:

### Contoh Testing dengan curl:

```bash
# Tambah album
curl -X POST http://localhost:5000/albums \
  -H "Content-Type: application/json" \
  -d '{"name": "Viva la Vida", "year": 2008}'

# Tambah lagu
curl -X POST http://localhost:5000/songs \
  -H "Content-Type: application/json" \
  -d '{"title": "Life in Technicolor", "year": 2008, "genre": "Indie", "performer": "Coldplay"}'

# Get semua lagu
curl http://localhost:5000/songs

# Search lagu
curl "http://localhost:5000/songs?title=Life&performer=Coldplay"
```

## 🐳 Docker Support

Proyek ini dilengkapi dengan Docker dan Docker Compose untuk containerization:

### Single Container:

```bash
# Build image
docker build -t openmusic-api .

# Run container
docker run -p 5000:5000 openmusic-api
```

### With Database (Docker Compose):

```bash
# Run full stack
docker-compose up --build

# Stop containers
docker-compose down
```

## 🚦 Status Project

✅ **Completed Features:**

### Kriteria Utama:

- ✅ Konfigurasi proyek Node.js dengan npm start
- ✅ Pengelolaan data Album (CRUD operations)
- ✅ Pengelolaan data Song (CRUD operations)
- ✅ Data validation menggunakan Joi
- ✅ Error handling yang comprehensive
- ✅ Database PostgreSQL dengan migrations

### Kriteria Opsional:

- ✅ Daftar lagu dalam detail album
- ✅ Query parameter pencarian lagu (title & performer)

### Additional Features:

- ✅ Docker containerization
- ✅ ESLint configuration
- ✅ Environment variable management
- ✅ Database relationship (songs → albums)
- ✅ Comprehensive error handling
- ✅ Clean code architecture

## 🔮 Future Enhancements

- 🔐 Authentication & Authorization (Next Submission)
- 📄 Pagination untuk large datasets
- 📊 Analytics dan reporting
- 🔍 Advanced search dengan multiple criteria
- 📤 Export data (JSON, CSV)
- 🌐 API versioning
- 📚 API documentation dengan Swagger
- 🎨 Album cover upload
- ⭐ Rating system untuk albums/songs
- 🎵 Playlist management

## 🤝 Kontribusi

Project ini dibuat untuk keperluan submission kelas. Jika Anda memiliki saran atau menemukan bug, silakan buat issue atau pull request.

## 📄 Lisensi

© 2025 Ilham Maulana - All Rights Reserved

## 👨‍💻 Developer

**Ilham Maulana**

- Mahasiswa Tingkat 4, Semester 7
- Kelas: Belajar Fundamental Back-End dengan JavaScript
- Submission: OpenMusic API versi 1

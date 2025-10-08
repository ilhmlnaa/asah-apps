# Bookshelf API

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://bookshelf.asah-app.hamdiv.me/)

**Proyek: Belajar Membuat Aplikasi Web dengan React**

Bookshelf API adalah RESTful API untuk mengelola koleksi buku yang dibuat menggunakan framework Hapi.js. Aplikasi ini merupakan submission untuk kelas **Belajar Back-End Pemula dengan JavaScript** dengan implementasi CRUD operations, filtering, dan validasi data.

## 🌟 Fitur Utama

### 📚 Manajemen Buku

- ➕ **Tambah Buku** - Menambahkan buku baru ke dalam koleksi
- 📖 **Lihat Semua Buku** - Menampilkan daftar semua buku dengan filtering
- 🔍 **Detail Buku** - Melihat informasi lengkap buku berdasarkan ID
- ✏️ **Edit Buku** - Mengubah informasi buku yang sudah ada
- 🗑️ **Hapus Buku** - Menghapus buku dari koleksi

### 🔍 Filtering & Pencarian

- 🏷️ **Filter by Name** - Mencari buku berdasarkan nama
- 📖 **Filter by Reading Status** - Filter buku sedang dibaca/tidak
- ✅ **Filter by Finished Status** - Filter buku yang sudah selesai dibaca

### 🛡️ Validasi Data

- ✔️ **Input Validation** - Validasi semua input data buku
- 🚫 **Error Handling** - Penanganan error yang comprehensive
- 📝 **Response Format** - Format response yang konsisten

## 🛠️ Teknologi yang Digunakan

- **Hapi.js 21.3.2** - Framework web untuk Node.js
- **Node.js** - Runtime environment JavaScript
- **nanoid** - Generator ID unik untuk buku
- **ESLint** - Linting tool untuk code quality
- **Nodemon** - Development tool untuk auto-restart

## 📦 Instalasi & Menjalankan

1. **Clone repository:**

```bash
git clone <repository-url>
cd bookshelf-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Jalankan development server:**

```bash
npm run start-dev
```

4. **Jalankan production server:**

```bash
npm run start
```

5. **Server akan berjalan di:**

```
http://localhost:9000
```

## 🚀 Scripts yang Tersedia

- `npm run start` - Menjalankan server production
- `npm run start-dev` - Menjalankan server dengan nodemon untuk development
- `npm run lint` - Menjalankan ESLint untuk mengecek kode

## 📁 Struktur Project

```
bookshelf-api/
├── src/
│   ├── books.js         # Data storage dan utility functions
│   ├── handler.js       # Request handlers untuk semua endpoint
│   ├── routes.js        # Route definitions
│   └── server.js        # Server configuration dan startup
├── Dockerfile           # Docker configuration
├── eslint.config.mjs    # ESLint configuration
├── package.json         # Dependencies dan scripts
├── README.md           # Project documentation
├── Bookshelf-API-Test.postman_collection.json  # Postman collection
├── Bookshelf-API-Test.postman_environment.json # Postman environment
└── newman-result.txt   # Test results
```

## 🔌 API Endpoints

### 📚 Menambah Buku

- **Method**: `POST`
- **URL**: `/books`
- **Body Request**:

```json
{
  "name": "string",
  "year": "number",
  "author": "string",
  "summary": "string",
  "publisher": "string",
  "pageCount": "number",
  "readPage": "number",
  "reading": "boolean"
}
```

- **Response Success** (201):

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "1L7ZtDUFeGs7VlEt"
  }
}
```

### 📖 Menampilkan Semua Buku

- **Method**: `GET`
- **URL**: `/books`
- **Query Parameters** (opsional):

  - `name`: Filter buku berdasarkan nama
  - `reading`: Filter buku berdasarkan status baca (0/1)
  - `finished`: Filter buku berdasarkan status selesai (0/1)

- **Response Success** (200):

```json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "1L7ZtDUFeGs7VlEt",
        "name": "Buku A",
        "publisher": "Dicoding Indonesia"
      }
    ]
  }
}
```

### 🔍 Menampilkan Detail Buku

- **Method**: `GET`
- **URL**: `/books/{bookId}`
- **Response Success** (200):

```json
{
  "status": "success",
  "data": {
    "book": {
      "id": "1L7ZtDUFeGs7VlEt",
      "name": "Buku A",
      "year": 2010,
      "author": "John Doe",
      "summary": "Lorem ipsum dolor sit amet",
      "publisher": "Dicoding Indonesia",
      "pageCount": 100,
      "readPage": 25,
      "finished": false,
      "reading": false,
      "insertedAt": "2021-03-04T09:11:44.598Z",
      "updatedAt": "2021-03-04T09:11:44.598Z"
    }
  }
}
```

### ✏️ Mengubah Data Buku

- **Method**: `PUT`
- **URL**: `/books/{bookId}`
- **Body Request**: JSON dengan properti yang ingin diubah
- **Response Success** (200):

```json
{
  "status": "success",
  "message": "Buku berhasil diperbarui"
}
```

### 🗑️ Menghapus Buku

- **Method**: `DELETE`
- **URL**: `/books/{bookId}`
- **Response Success** (200):

```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

## 🧪 Testing

Proyek ini dilengkapi dengan Postman collection dan environment untuk testing:

1. **Import Collection**: `Bookshelf-API-Test.postman_collection.json`
2. **Import Environment**: `Bookshelf-API-Test.postman_environment.json`
3. **Jalankan Test**: Gunakan Newman atau Postman Runner

## 🔧 Validasi & Error Handling

### Input Validation

- `name` wajib diisi
- `readPage` tidak boleh lebih besar dari `pageCount`
- Semua field sesuai dengan tipe data yang diharapkan

### Error Responses

- **400 Bad Request**: Data input tidak valid
- **404 Not Found**: Buku tidak ditemukan
- **500 Internal Server Error**: Server error

## 🐳 Docker Support

Proyek ini dilengkapi dengan Dockerfile untuk containerization:

```bash
# Build image
docker build -t bookshelf-api .

# Run container
docker run -p 9000:9000 bookshelf-api
```

## 🚦 Status Project

✅ **Completed Features:**

- CRUD operations untuk manajemen buku
- Filtering berdasarkan name, reading, finished
- Input validation dan error handling
- Response format yang konsisten
- ESLint configuration
- Postman collection untuk testing
- Docker support

## 🔮 Future Enhancements

- 🗄️ Database integration (PostgreSQL/MongoDB)
- 🔐 Authentication & Authorization
- 📄 Pagination untuk large datasets
- 📊 Analytics dan reporting
- 🔍 Advanced search dengan multiple criteria
- 📤 Export data (JSON, CSV)
- 🌐 API versioning
- 📚 API documentation dengan Swagger

## 🤝 Kontribusi

Project ini dibuat untuk keperluan submission kelas. Jika Anda memiliki saran atau menemukan bug, silakan buat issue atau pull request.

## 📄 Lisensi

© 2025 Ilham Maulana - All Rights Reserved

## 👨‍💻 Developer

**Ilham Maulana**

- Mahasiswa Tingkat 4, Semester 7
- Kelas: Belajar Back-End Pemula dengan JavaScript
- Submission: Bookshelf API

---

_Project ini dibuat sebagai submission untuk kelas "Belajar Back-End Pemula dengan JavaScript" dengan fokus pada implementasi RESTful API, CRUD operations, dan validasi data menggunakan Hapi.js framework._

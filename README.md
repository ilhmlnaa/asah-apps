# Bookshelf API

## SUBMISSION Belajar Back-End Pemula dengan JavaScript

API untuk mengelola koleksi buku menggunakan framework Hapi.js.

## Instalasi

1. Clone repository ini
2. Jalankan `npm install` untuk menginstall dependencies
3. Jalankan `npm run start` untuk menjalankan server

## Penggunaan

Server akan berjalan di port 9000. Berikut adalah endpoint yang tersedia:

### 1. Menambah Buku

- **Method**: POST
- **URL**: `/books`
- **Body**: JSON dengan properti name, year, author, summary, publisher, pageCount, readPage, reading

### 2. Menampilkan Semua Buku

- **Method**: GET
- **URL**: `/books`
- **Query Parameters** (opsional):
  - `name`: Filter buku berdasarkan nama
  - `reading`: Filter buku berdasarkan status baca (0/1)
  - `finished`: Filter buku berdasarkan status selesai (0/1)

### 3. Menampilkan Detail Buku

- **Method**: GET
- **URL**: `/books/{bookId}`

### 4. Mengubah Data Buku

- **Method**: PUT
- **URL**: `/books/{bookId}`
- **Body**: JSON dengan properti yang ingin diubah

### 5. Menghapus Buku

- **Method**: DELETE
- **URL**: `/books/{bookId}`

## Scripts

- `npm run start`: Menjalankan server
- `npm run start-dev`: Menjalankan server dengan nodemon
- `npm run lint`: Menjalankan ESLint untuk mengecek kode

#### ILHAM MAULANA

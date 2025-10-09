# OpenMusic API v1

OpenMusic API adalah sebuah RESTful API untuk mengelola data album dan lagu musik. API ini dibuat menggunakan framework Hapi.js dan PostgreSQL sebagai database.

## Fitur

### Kriteria Utama:

1. **Konfigurasi Node.js** - Server dapat dijalankan dengan `npm run start`
2. **Pengelolaan Data Album** - CRUD operations untuk album
3. **Pengelolaan Data Song** - CRUD operations untuk lagu
4. **Data Validation** - Validasi input menggunakan Joi
5. **Error Handling** - Penanganan error yang proper
6. **Database PostgreSQL** - Penyimpanan data menggunakan PostgreSQL dengan migrations

### Kriteria Opsional:

1. **Daftar lagu dalam album** - Menampilkan songs dalam detail album
2. **Query parameter pencarian** - Pencarian lagu berdasarkan title dan performer

## Prerequisites

- Node.js (v14 atau lebih tinggi)
- PostgreSQL
- npm atau yarn

## Instalasi

1. Clone repository ini
2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup database PostgreSQL dan buat database `openmusicdb`

4. Copy file `.env` dan sesuaikan konfigurasi database:

   ```
   HOST=localhost
   PORT=5000
   PGUSER=your_username
   PGPASSWORD=your_password
   PGDATABASE=openmusicdb
   PGHOST=localhost
   PGPORT=5432
   ```

5. Jalankan migrations:

   ```bash
   npm run migrate up
   ```

6. Jalankan server:
   ```bash
   npm start
   ```

Server akan berjalan di `http://localhost:5000`

## API Endpoints

### Albums

- `POST /albums` - Menambah album baru
- `GET /albums/{id}` - Mendapatkan detail album beserta lagu-lagunya
- `PUT /albums/{id}` - Mengubah data album
- `DELETE /albums/{id}` - Menghapus album

### Songs

- `POST /songs` - Menambah lagu baru
- `GET /songs` - Mendapatkan semua lagu (dengan optional query ?title dan ?performer)
- `GET /songs/{id}` - Mendapatkan detail lagu
- `PUT /songs/{id}` - Mengubah data lagu
- `DELETE /songs/{id}` - Menghapus lagu

## Scripts

- `npm start` - Menjalankan server production
- `npm run start:dev` - Menjalankan server development dengan nodemon
- `npm run migrate` - Menjalankan migrations
- `npm run lint` - Menjalankan ESLint
- `npm run lint:fix` - Memperbaiki ESLint errors

## Struktur Project

```
src/
├── api/
│   ├── albums/
│   │   ├── handler.js
│   │   ├── index.js
│   │   └── routes.js
│   └── songs/
│       ├── handler.js
│       ├── index.js
│       └── routes.js
├── exceptions/
│   ├── ClientError.js
│   ├── InvariantError.js
│   └── NotFoundError.js
├── service/
│   └── postgres/
│       ├── AlbumsService.js
│       └── SongsService.js
├── utils/
│   └── index.js
├── validator/
│   ├── albums/
│   │   ├── index.js
│   │   └── schema.js
│   └── songs/
│       ├── index.js
│       └── schema.js
└── server.js
```

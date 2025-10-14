<div align="center">

# 📨 OpenMusic V3 Consumer Service

</div>

Program consumer untuk menangani ekspor playlist dari OpenMusic API v3. Consumer ini menggunakan **RabbitMQ** untuk menerima pesan ekspor dan **Nodemailer** untuk mengirim hasil ekspor melalui email 📧.

---

## ✨ Fitur

- 🔄 Mengkonsumsi pesan dari queue `export:playlists`
- 🗄️ Mengambil data playlist dari database
- 📩 Mengirim hasil ekspor dalam format JSON melalui email
- 🐰 Terintegrasi dengan RabbitMQ message broker

---

## 🗂️ Struktur Project

```text
openmusicv3-consumer/
├─ Dockerfile
├─ package.json
├─ package-lock.json
├─ README.md
└─ src/
   ├─ index.js                # Entry point aplikasi consumer
   ├─ consumer/
   │  └─ ExportsConsumer.js   # Handler pesan export:playlists
   ├─ exceptions/
   │  └─ ClientError.js       # Kelas error untuk response terkontrol
   ├─ service/
   │  ├─ MailService.js       # Kirim email via Nodemailer
   │  ├─ PlaylistsService.js  # Query playlist & lagu dari PostgreSQL
   │  └─ UsersService.js      # Query data user dari PostgreSQL
   └─ utils/
      ├─ config.js            # Pembacaan environment variables
      └─ connection.js        # Koneksi RabbitMQ & helper koneksi DB
```

---

## 🚀 Instalasi

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Setup Environment Variables

```bash
cp .env.example .env
# Edit .env sesuai konfigurasi Anda
```

### 3️⃣ Jalankan Consumer

```bash
npm start
```

Atau untuk development:

```bash
npm run start:dev
```

---

## ⚙️ Environment Variables

```env
# Database
PGUSER=developer
PGHOST=localhost
PGPASSWORD=supersecretpassword
PGDATABASE=openmusicv3
PGPORT=5432

# RabbitMQ
RABBITMQ_SERVER=amqp://localhost

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

## 📄 Format Ekspor

Data yang diekspor memiliki format JSON berikut:

```json
{
  "playlist": {
    "id": "playlist-Mk8AnmCp210PwT6B",
    "name": "My Favorite Coldplay Song",
    "songs": [
      {
        "id": "song-Qbax5Oy7L8WKf74l",
        "title": "Life in Technicolor",
        "performer": "Coldplay"
      },
      {
        "id": "song-poax5Oy7L8WKllqw",
        "title": "Centimeteries of London",
        "performer": "Coldplay"
      }
    ]
  }
}
```

---

## 🐳 Docker

Jalankan menggunakan Docker:

```bash
docker build -t openmusic-consumer .
docker run --env-file .env openmusic-consumer
```

Atau gunakan `docker-compose` dari aplikasi utama yang sudah include consumer.

---

## 📦 Dependencies

- 🐰 **amqplib** - RabbitMQ client
- 🔧 **dotenv** - Environment variables
- 📧 **nodemailer** - Email service
- 🐘 **pg** - PostgreSQL client

---

## ⚡ Cara Kerja

1. 👂 Consumer mendengarkan queue `export:playlists`
2. 📨 Ketika ada pesan masuk, consumer mengambil `playlistId` dan `targetEmail`
3. 🔍 Consumer mengquery database untuk mendapatkan data playlist dan lagu-lagunya
4. 📤 Data dikirim melalui email sebagai attachment JSON
5. 🔄 Consumer siap menerima pesan berikutnya

---

## 📊 Monitoring

Consumer akan menampilkan log untuk setiap pesan yang diproses. Pastikan untuk memonitor log untuk memastikan consumer berjalan dengan baik 📈.

---

## 📝 License

This project is licensed under the MIT License. **© Ilham**

---

# Personal Notes App

Personal Notes App adalah aplikasi web untuk mengelola catatan pribadi yang dibuat menggunakan React. Aplikasi ini merupakan submission pertama untuk kelas **Belajar Membuat Aplikasi Web dengan React**.

## 🌟 Fitur

- ✍️ **Tambah Catatan Baru** - Buat catatan dengan judul dan isi
- 🔍 **Pencarian** - Cari catatan berdasarkan judul
- 📁 **Arsip Catatan** - Pindahkan catatan ke arsip atau kembalikan ke catatan aktif
- 🗑️ **Hapus Catatan** - Hapus catatan yang tidak diperlukan
- 📱 **Responsive Design** - Tampilan yang optimal di berbagai perangkat
- ⚡ **Real-time Search** - Pencarian langsung saat mengetik

## 🛠️ Teknologi yang Digunakan

- **React** 
- **Vite** 
- **CSS3** 
- **JavaScript ES6+** 

## 📦 Instalasi

1. Clone repository ini:

```bash
git clone <repository-url>
cd submission-ilham-personal-notes
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan aplikasi dalam mode development:

```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:5173`

## 🚀 Scripts yang Tersedia

- `npm run dev` - Menjalankan aplikasi dalam mode development
- `npm run build` - Build aplikasi untuk production
- `npm run serve` - Preview aplikasi yang sudah di-build

## 📁 Struktur Project

```
submission-ilham-personal-notes/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── NotesApp.jsx      # Komponen utama aplikasi
│   │   ├── NoteItem.jsx      # Komponen item catatan
│   │   ├── NotesInput.jsx    # Form input catatan baru
│   │   ├── NotesList.jsx     # Daftar catatan
│   │   └── NotesSearch.jsx   # Komponen pencarian
│   ├── styles/
│   │   └── style.css         # File styling utama
│   ├── utils/
│   │   └── index.js          # Utility functions dan data awal
│   └── index.jsx             # Entry point aplikasi
├── index.html                # Template HTML
├── package.json              # Dependencies dan scripts
└── README.md                 # Dokumentasi project
```

## 💡 Cara Menggunakan

### Menambah Catatan Baru

1. Masukkan judul catatan (maksimal 50 karakter)
2. Masukkan isi catatan
3. Klik tombol "Buat" untuk menyimpan

### Mencari Catatan

- Gunakan kolom pencarian di bagian atas untuk mencari catatan berdasarkan judul
- Pencarian akan bekerja secara real-time saat Anda mengetik

### Mengelola Catatan

- **Arsipkan**: Klik tombol "Arsipkan" untuk memindahkan catatan ke arsip
- **Aktifkan**: Klik tombol "Pindahkan" pada catatan yang diarsip untuk mengembalikannya
- **Hapus**: Klik tombol "Delete" untuk menghapus catatan secara permanen

## 🎨 Komponen Utama

### NotesApp

Komponen utama yang mengelola state aplikasi dan mengatur alur data antar komponen.

### NotesInput

Komponen form untuk menambah catatan baru dengan validasi input.

### NotesList

Komponen yang menampilkan daftar catatan dengan fitur empty state.

### NoteItem

Komponen individual untuk setiap catatan dengan tombol aksi.

### NotesSearch

Komponen pencarian dengan kontrol input real-time.

## 🔧 Fitur Teknis

- **State Management**: Menggunakan React Hooks (useState)
- **Component Composition**: Pemecahan UI menjadi komponen yang reusable
- **Event Handling**: Penanganan event form dan user interaction
- **Conditional Rendering**: Tampilan dinamis berdasarkan state
- **Array Methods**: Filtering dan mapping data catatan
- **Local Storage**: Data disimpan dalam memory (reset saat refresh)

## 📱 Screenshots

_Screenshot akan ditambahkan setelah deployment_

## 🤝 Kontribusi

Project ini dibuat untuk keperluan submission kelas. Jika Anda memiliki saran atau menemukan bug, silakan buat issue atau pull request.

## 📄 Lisensi

© 2025 Ilham Maulana - All Rights Reserved

## 👨‍💻 Developer

**Ilham Maulana**

- Mahasiswa Tingkat 4, Semester 7
- Program Studi: [Nama Program Studi]
- Universitas: [Nama Universitas]

---

_Project ini dibuat sebagai submission pertama untuk kelas "Belajar Membuat Aplikasi Web dengan React"_

# Bookshelf App

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://m.hamdiv.me/asah/bookself/)

**Proyek: Membangun Bookshelf App**

Bookshelf App adalah aplikasi web untuk mengelola koleksi buku pribadi yang dibuat menggunakan HTML, CSS, dan JavaScript vanilla. Aplikasi ini merupakan submission untuk kelas **Belajar Membuat Front-End Web untuk Pemula** dengan implementasi fitur CRUD, pencarian, dan local storage.

## 🌟 Fitur Utama

### 📚 Manajemen Buku

- ➕ **Tambah Buku** - Menambahkan buku baru dengan judul, penulis, dan tahun terbit
- 📖 **Status Baca** - Menandai buku sebagai "Selesai dibaca" atau "Belum selesai dibaca"
- ✏️ **Edit Buku** - Mengubah informasi buku yang sudah ada
- 🗑️ **Hapus Buku** - Menghapus buku dari koleksi dengan konfirmasi
- 🔄 **Pindah Status** - Memindahkan buku antar kategori (selesai/belum selesai)

### 🔍 Pencarian & Filter

- 🔍 **Pencarian Real-time** - Cari buku berdasarkan judul
- 📋 **Kategori Terpisah** - Buku selesai dan belum selesai dibaca di section berbeda
- 🧹 **Bersihkan Pencarian** - Reset hasil pencarian dengan satu klik

### 💾 Penyimpanan Data

- 💾 **Local Storage** - Data tersimpan lokal di browser
- 🔄 **Auto Save** - Perubahan tersimpan otomatis
- 📱 **Persistent Data** - Data tetap ada setelah browser ditutup

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur dan semantic markup
- **CSS3** - Styling dengan modern CSS features
- **JavaScript ES6+** - Logic aplikasi dan DOM manipulation
- **Local Storage API** - Penyimpanan data lokal
- **Responsive Design** - Layout yang adaptif

## 📦 Instalasi & Menjalankan

1. **Clone repository:**

```bash
git clone <repository-url>
cd bookshelf-app-ilham
```

2. **Buka file HTML:**

   - Buka `index.html` di browser favorit Anda
   - Atau gunakan Live Server extension di VS Code

3. **Mulai menggunakan aplikasi:**
   - Aplikasi siap digunakan tanpa instalasi dependency tambahan

## 📁 Struktur Project

```
bookshelf-app-ilham/
├── index.html          # Struktur HTML utama aplikasi
├── main.js             # Logic JavaScript dan DOM manipulation
├── style.css           # Styling dan layout aplikasi
└── README.md           # Dokumentasi project
```

## 💡 Cara Menggunakan

### ➕ Menambah Buku Baru

1. Isi form "Tambah Buku Baru":

   - **Judul**: Masukkan judul buku
   - **Penulis**: Nama penulis buku
   - **Tahun**: Tahun terbit buku
   - **Status**: Centang jika sudah selesai dibaca

2. Klik tombol "Masukkan Buku ke rak" untuk menyimpan

### 🔍 Mencari Buku

1. Gunakan form "Cari Buku"
2. Masukkan judul buku yang ingin dicari
3. Klik "Cari" atau "Bersihkan Hasil Pencarian"

### ✏️ Mengelola Buku

1. **Edit Buku**: Klik tombol "Edit" pada buku yang ingin diubah
2. **Hapus Buku**: Klik tombol "Hapus" dan konfirmasi penghapusan
3. **Pindah Status**: Klik tombol "Selesai dibaca"/"Belum selesai dibaca"

## 🎯 Fitur Teknis Advanced

### 📊 Data Management

- **CRUD Operations** - Create, Read, Update, Delete untuk data buku
- **Local Storage Integration** - Persistent data storage
- **Unique ID Generation** - Timestamp-based ID untuk setiap buku
- **Data Validation** - Form validation untuk input yang valid

### 🎨 User Interface

- **Responsive Layout** - Optimized untuk desktop dan mobile
- **Form Handling** - Dynamic form behavior dan validation
- **Real-time Updates** - Interface update otomatis saat data berubah
- **Confirmation Dialogs** - Konfirmasi untuk aksi penting

### 🔍 Search Functionality

- **Live Search** - Pencarian real-time tanpa reload
- **Case Insensitive** - Pencarian tidak case sensitive
- **Partial Match** - Mendukung pencarian sebagian kata
- **Search Results Display** - Tampilan hasil pencarian terpisah

## 📱 Responsive Design

### Desktop Experience

- Layout grid untuk optimal space utilization
- Form dan button sizing yang comfortable
- Hover effects untuk better interaction

### Mobile Experience

- Touch-friendly button sizes
- Responsive form layout
- Optimized spacing untuk small screens

## 🔧 Ketentuan Submission

### Data Attributes Requirements

Setiap elemen buku harus memiliki atribut berikut:

- `data-bookid`: ID unik untuk setiap buku
- `data-testid`: Identifier untuk testing automation

#### Data TestID Yang Digunakan:

- `bookItem`: Container untuk setiap item buku
- `bookItemTitle`: Element judul buku
- `bookItemAuthor`: Element penulis buku
- `bookItemYear`: Element tahun terbit
- `bookItemIsCompleteButton`: Tombol ubah status baca
- `bookItemDeleteButton`: Tombol hapus buku
- `bookItemEditButton`: Tombol edit buku

### Template HTML Buku:

```html
<div data-bookid="{{ ID_buku }}" data-testid="bookItem">
  <h3 data-testid="bookItemTitle">{{ judul_buku }}</h3>
  <p data-testid="bookItemAuthor">Penulis: {{ penulis_buku }}</p>
  <p data-testid="bookItemYear">Tahun: {{ tahun_rilis_buku }}</p>
  <div>
    <button data-testid="bookItemIsCompleteButton">
      {{ tombol_untuk_ubah_kondisi }}
    </button>
    <button data-testid="bookItemDeleteButton">{{ tombol_untuk_hapus }}</button>
    <button data-testid="bookItemEditButton">{{ tombol_untuk_edit }}</button>
  </div>
</div>
```

## 📊 Fitur JavaScript Implementation

### Core Functions

- `generateId()` - Generate unique timestamp ID
- `loadDataFromStorage()` - Load books from localStorage
- `saveDataToStorage()` - Save books to localStorage
- `addBook()` - Add new book to collection
- `deleteBook()` - Remove book from collection
- `editBook()` - Edit existing book data
- `moveBook()` - Change book read status
- `searchBooks()` - Search functionality
- `renderBooks()` - Render books to DOM

### Event Handling

- Form submission handling
- Button click events
- Search input events
- Status change events

## 🎨 CSS Features

### Modern CSS Implementation

- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Variables** - Consistent color scheme
- **Responsive Units** - rem, em, vh, vw untuk scaling
- **Media Queries** - Responsive breakpoints
- **Box Model** - Proper spacing dan sizing

### Styling Components

- Form styling dengan focus states
- Button hover effects
- Card-based book display
- Typography hierarchy
- Color scheme consistency

## 🚦 Status Project

✅ **Completed Features:**

- ✅ CRUD Operations (Create, Read, Update, Delete)
- ✅ Local Storage integration
- ✅ Search functionality
- ✅ Responsive design
- ✅ Form validation
- ✅ Status management (read/unread)
- ✅ Data persistence
- ✅ Modern JavaScript ES6+
- ✅ Semantic HTML structure
- ✅ Accessibility considerations

## 🔮 Future Enhancements

- 📊 **Statistics Dashboard** - Reading progress tracking
- 🏷️ **Categories/Tags** - Organize books by genre
- ⭐ **Rating System** - Rate books 1-5 stars
- 📝 **Notes/Reviews** - Add personal notes untuk setiap buku
- 📤 **Export/Import** - Backup dan restore data
- 🌙 **Dark Mode** - Theme switching
- 📱 **PWA Support** - Installable web app
- 🔄 **Sync** - Cloud synchronization

## 🤝 Kontribusi

Project ini dibuat untuk keperluan submission kelas. Jika Anda memiliki saran atau menemukan bug, silakan buat issue atau pull request.

## 📄 Lisensi

© 2025 Ilham Maulana - All Rights Reserved

## 👨‍💻 Developer

**Ilham Maulana**

- Mahasiswa Tingkat 4, Semester 7
- Kelas: Belajar Membuat Front-End Web untuk Pemula
- Submission: Bookshelf App (Final Project)

---

_Project ini dibuat sebagai submission untuk kelas "Belajar Membuat Front-End Web untuk Pemula" dengan fokus pada implementasi JavaScript DOM manipulation, local storage, dan responsive web design._

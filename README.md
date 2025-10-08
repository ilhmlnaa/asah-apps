# Personal Notes App

**Proyek: Membangun SPA + API, Context, dan Hooks**

Personal Notes App adalah aplikasi web untuk mengelola catatan pribadi yang dibuat menggunakan React. Aplikasi ini merupakan submission kedua untuk kelas **Belajar Fundamental Aplikasi Web dengan React** dengan implementasi fitur autentikasi, routing, dan integrasi API.

## 🌟 Fitur Utama

### 🔐 Autentikasi & Keamanan

- 📝 **Registrasi Pengguna** - Daftar akun baru dengan validasi form
- 🔑 **Login/Logout** - Sistem login dengan token-based authentication
- 🔒 **Protected Routes** - Halaman yang memerlukan autentikasi
- 🛡️ **Session Management** - Pengelolaan sesi pengguna otomatis

### 📝 Manajemen Catatan

- ✍️ **Tambah Catatan** - Buat catatan baru dengan judul dan isi
- 👁️ **Detail Catatan** - Lihat catatan lengkap dengan tanggal pembuatan
- 🔍 **Pencarian Real-time** - Cari catatan berdasarkan judul
- 📁 **Arsip Catatan** - Arsipkan/batalkan arsip catatan
- 🗑️ **Hapus Catatan** - Hapus catatan permanen dengan konfirmasi
- 📊 **Halaman Terpisah** - Catatan aktif dan arsip di halaman berbeda

### 🎨 User Experience

- 🌙 **Dark/Light Theme** - Toggle tema gelap/terang
- 🌍 **Multi-language** - Bahasa Indonesia & English
- 📱 **Responsive Design** - Optimal di desktop, tablet, dan mobile
- 🍞 **Toast Notifications** - Notifikasi real-time untuk feedback
- ⚡ **Loading States** - Indikator loading yang smooth
- 🎯 **Modal Confirmations** - Konfirmasi untuk aksi penting

## 🛠️ Teknologi yang Digunakan

- **React 18.2.0** - Library JavaScript untuk UI
- **React Router DOM 7.9.1** - Routing dan navigasi SPA
- **React Icons 5.5.0** - Icon library yang comprehensive
- **Vite 4.2.0** - Build tool dan development server
- **CSS3 Custom Properties** - Styling dengan CSS Variables
- **JavaScript ES6+** - Modern JavaScript features
- **API Integration** - RESTful API dari Dicoding Notes API

## 🔧 Arsitektur & Pattern

### 📂 Context API Implementation

- **AuthContext** - Manajemen state autentikasi global
- **ThemeContext** - Pengelolaan tema aplikasi
- **LanguageContext** - Sistem multi-bahasa
- **ToastContext** - Notifikasi global

### 🎯 Custom Hooks

- **useInput** - Hook untuk input form management
- **useModal** - Hook untuk modal state management

### 🛡️ Protected Routing

- Route protection berdasarkan status autentikasi
- Automatic redirect untuk unauthorized access
- Persistent session dengan localStorage

## 📦 Instalasi & Menjalankan

1. **Clone repository:**

```bash
git clone <repository-url>
cd Submission2-Ilham-Maulana
```

2. **Install dependencies:**

```bash
npm install
```

3. **Jalankan development server:**

```bash
npm run dev
```

4. **Buka browser dan akses:**

```
http://localhost:5173
```

## 🚀 Scripts yang Tersedia

- `npm run dev` - Menjalankan development server dengan host access
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview hasil build production

## 📁 Struktur Project

```
Submission2-Ilham-Maulana/
├── public/
│   ├── favicon.ico           # App icon
│   └── pencil.png           # Additional assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.jsx       # App footer
│   │   ├── Header.jsx       # App header
│   │   ├── Loading.jsx      # Loading spinner component
│   │   ├── Modal.jsx        # Modal dialog component
│   │   ├── Navigation.jsx   # Navigation bar
│   │   ├── NoteItem.jsx     # Individual note card
│   │   ├── NotesList.jsx    # Notes grid/list container
│   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   ├── SearchBar.jsx    # Search input component
│   │   └── Toast.jsx        # Toast notification system
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state management
│   │   ├── LanguageContext.jsx # Multi-language support
│   │   ├── ThemeContext.jsx # Theme switching (dark/light)
│   │   └── ToastContext.jsx # Toast notifications state
│   ├── hooks/               # Custom React hooks
│   │   ├── useInput.js      # Form input management hook
│   │   └── useModal.js      # Modal state management hook
│   ├── pages/               # Route components (pages)
│   │   ├── AddNotePage.jsx  # Add new note page
│   │   ├── ArchivedPage.jsx # Archived notes page
│   │   ├── DetailPage.jsx   # Note detail view page
│   │   ├── Homepage.jsx     # Active notes homepage
│   │   ├── LoginPage.jsx    # User login page
│   │   ├── NotFoundPage.jsx # 404 error page
│   │   └── RegisterPage.jsx # User registration page
│   ├── styles/
│   │   └── style.css        # Global styles with CSS variables
│   ├── utils/               # Utility functions and API
│   │   ├── index.js         # Helper functions (date formatting)
│   │   ├── local-data.js    # Initial/fallback data
│   │   └── network-data.js  # API integration functions
│   ├── App.jsx              # Main app component with routing
│   └── index.jsx            # App entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## 💡 Cara Menggunakan

### 🔐 Autentikasi

1. **Registrasi Akun Baru:**

   - Klik "Daftar" atau navigasi ke `/register`
   - Isi form: Nama, Email, Password, Konfirmasi Password
   - Submit form untuk membuat akun

2. **Login:**
   - Klik "Masuk" atau navigasi ke `/login`
   - Masukkan email dan password
   - Berhasil login akan redirect ke homepage

### 📝 Mengelola Catatan

1. **Menambah Catatan:**

   - Klik tombol "+" di homepage
   - Isi judul (maksimal 50 karakter) dan isi catatan
   - Klik "Simpan" untuk menyimpan

2. **Melihat Detail Catatan:**

   - Klik pada card catatan untuk melihat detail lengkap
   - Lihat tanggal pembuatan dan isi catatan penuh

3. **Mencari Catatan:**

   - Gunakan search bar di bagian atas
   - Pencarian real-time berdasarkan judul
   - URL akan update dengan parameter pencarian

4. **Mengarsipkan Catatan:**

   - Di homepage: klik "Arsipkan" pada catatan
   - Di halaman arsip: klik "Batal Arsip" untuk mengembalikan

5. **Menghapus Catatan:**
   - Klik tombol "Hapus" pada catatan atau di detail page
   - Konfirmasi penghapusan di modal dialog

### 🎨 Pengaturan Aplikasi

1. **Ganti Tema:**

   - Klik icon bulan/matahari di navigation
   - Toggle antara dark mode dan light mode

2. **Ganti Bahasa:**
   - Klik tombol "ID/EN" di navigation
   - Switch antara Bahasa Indonesia dan English

## 🔌 API Integration

Aplikasi terintegrasi dengan **Dicoding Notes API** (`https://notes-api.dicoding.dev/v1`) dengan endpoint:

- `POST /register` - Registrasi pengguna baru
- `POST /login` - Login pengguna
- `GET /users/me` - Data pengguna login
- `GET /notes` - Daftar catatan aktif
- `GET /notes/archived` - Daftar catatan arsip
- `GET /notes/:id` - Detail catatan
- `POST /notes` - Tambah catatan baru
- `POST /notes/:id/archive` - Arsipkan catatan
- `POST /notes/:id/unarchive` - Batalkan arsip
- `DELETE /notes/:id` - Hapus catatan

## 🎯 Fitur Teknis Advanced

### 🔄 State Management

- **Context API** untuk global state management
- **Reducer pattern** untuk complex state updates
- **Local Storage** untuk session persistence

### 🛡️ Security Features

- **JWT Token** authentication
- **Protected routes** dengan route guards
- **Automatic token refresh** handling
- **Secure logout** dengan token cleanup

### 📱 Responsive Design

- **Mobile-first approach** dengan breakpoints
- **Hamburger menu** untuk mobile navigation
- **Touch-friendly** button sizes
- **Flexible grid system** untuk notes layout

### ⚡ Performance Optimizations

- **Lazy loading** untuk route components
- **Debounced search** untuk efisiensi API calls
- **Loading states** untuk better UX
- **Error boundaries** untuk graceful error handling

### 🎨 UI/UX Enhancements

- **Smooth transitions** dan animations
- **Toast notifications** untuk user feedback
- **Modal confirmations** untuk destructive actions
- **Empty states** dengan helpful messages
- **Form validations** dengan real-time feedback

## 🌐 Multi-language Support

Aplikasi mendukung 2 bahasa:

- 🇮🇩 **Bahasa Indonesia** (default)
- 🇺🇸 **English**

Semua text, pesan error, dan UI labels tersedia dalam kedua bahasa dengan Context API untuk state management bahasa global.

## 🎨 Theme System

### Light Theme

- Background: Clean white/light gray
- Text: Dark colors untuk readability
- Accent: Blue primary colors

### Dark Theme

- Background: Dark gray/black
- Text: Light colors
- Accent: Softer blue tones

Theme preferences disimpan di localStorage dan persist across sessions.

## 📱 Screenshots

_Screenshots akan ditambahkan setelah deployment_

## 🚦 Status Project

✅ **Completed Features:**

- User Authentication (Register/Login/Logout)
- CRUD Operations untuk Notes
- Archive/Unarchive functionality
- Real-time Search dengan URL params
- Multi-language support (ID/EN)
- Dark/Light theme toggle
- Responsive design
- API integration dengan error handling
- Protected routing
- Toast notifications
- Modal confirmations
- Loading states
- Form validations

## 🔮 Future Enhancements

- 📝 Edit note functionality
- 🏷️ Tags/categories untuk notes
- 📎 File attachments
- 🔄 Offline support dengan PWA
- 📊 Analytics dashboard
- 🔍 Advanced search filters
- 📤 Export/import notes
- 👥 Sharing capabilities

## 🤝 Kontribusi

Project ini dibuat untuk keperluan submission kelas. Jika Anda memiliki saran atau menemukan bug, silakan buat issue atau pull request.

## 📄 Lisensi

© 2025 Ilham Maulana - All Rights Reserved

## 👨‍💻 Developer

**Ilham Maulana**

- Mahasiswa Tingkat 4, Semester 7
- Kelas: Belajar Fundamental Aplikasi Web dengan React
- Submission: Kedua (Advanced React Features)

---

_Project ini dibuat sebagai submission kedua untuk kelas "Belajar Fundamental Aplikasi Web dengan React" dengan fokus pada implementasi routing, autentikasi, state management, dan integrasi API._

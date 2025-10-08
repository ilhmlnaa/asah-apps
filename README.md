# Personal Notes App

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://m.hamdiv.me/asah/personal-notes-router/)

**Proyek: Membangun Single Page Application menggunakan React**

Personal Notes App adalah aplikasi web sederhana untuk mengelola catatan pribadi yang dibuat menggunakan React. Aplikasi ini merupakan submission pertama untuk kelas **Belajar Fundamental Aplikasi Web dengan React** dengan fokus pada implementasi dasar React, routing, dan state management.

## 🌟 Fitur Utama

### 📝 Manajemen Catatan

- ✍️ **Tambah Catatan** - Buat catatan baru dengan judul dan isi
- 👁️ **Detail Catatan** - Lihat catatan lengkap dengan tanggal pembuatan
- 🔍 **Pencarian Real-time** - Cari catatan berdasarkan judul dengan URL parameter
- 📁 **Arsip Catatan** - Arsipkan/batalkan arsip catatan
- 🗑️ **Hapus Catatan** - Hapus catatan permanen
- 📊 **Halaman Terpisah** - Catatan aktif dan arsip di halaman berbeda

### 🎨 User Experience

- 📱 **Responsive Design** - Optimal di desktop, tablet, dan mobile
- 🧭 **Single Page Application** - Navigasi cepat tanpa reload halaman
- 🔍 **Search dengan URL Parameters** - Bookmark dan share hasil pencarian
- 📄 **404 Page** - Halaman error yang informatif
- 🎯 **Clean UI** - Interface yang sederhana dan intuitif

## 🛠️ Teknologi yang Digunakan

- **React 18.2.0** - Library JavaScript untuk membangun UI
- **React Router DOM 7.9.1** - Routing dan navigasi untuk SPA
- **React Icons 5.5.0** - Icon library yang comprehensive
- **Vite 4.2.0** - Build tool dan development server yang cepat
- **CSS3** - Styling dengan modern CSS features
- **JavaScript ES6+** - Modern JavaScript syntax dan features

## 📦 Instalasi & Menjalankan

1. **Clone repository:**

```bash
git clone <repository-url>
cd sub-personal-notes-ilham
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

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview hasil build production

## 📁 Struktur Project

```
sub-personal-notes-ilham/
├── public/
│   ├── favicon.ico           # App icon
│   └── pencil.png           # Pencil icon asset
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.jsx       # App footer component
│   │   ├── Header.jsx       # App header dengan navigation
│   │   ├── NoteItem.jsx     # Individual note card component
│   │   ├── NotesList.jsx    # Notes grid/list container
│   │   └── SearchBar.jsx    # Search input component
│   ├── pages/               # Route components (pages)
│   │   ├── AddNotePage.jsx  # Add new note page
│   │   ├── ArchivedPage.jsx # Archived notes page
│   │   ├── DetailPage.jsx   # Note detail view page
│   │   ├── Homepage.jsx     # Active notes homepage
│   │   └── NotFoundPage.jsx # 404 error page
│   ├── styles/
│   │   └── style.css        # Global styles dan responsive design
│   ├── utils/               # Utility functions dan data
│   │   ├── index.js         # Helper functions (date formatting)
│   │   └── local-data.js    # Local data management dan CRUD functions
│   ├── App.jsx              # Main app component dengan routing setup
│   └── index.jsx            # App entry point
├── index.html               # HTML template
├── package.json             # Dependencies dan scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## 💡 Cara Menggunakan

### 📝 Mengelola Catatan

1. **Melihat Catatan Aktif:**

   - Akses homepage (`/`) untuk melihat semua catatan aktif
   - Catatan ditampilkan dalam grid layout yang responsive

2. **Menambah Catatan Baru:**

   - Klik tombol "+" (Add) di navigation atau homepage
   - Isi form dengan judul dan isi catatan
   - Klik "Simpan" untuk menyimpan catatan

3. **Melihat Detail Catatan:**

   - Klik pada card catatan untuk navigasi ke halaman detail
   - Lihat judul, tanggal pembuatan, dan isi catatan lengkap
   - Tersedia opsi arsip dan hapus di halaman detail

4. **Mencari Catatan:**

   - Gunakan search bar di bagian atas halaman
   - Pencarian real-time berdasarkan judul catatan
   - URL akan update dengan parameter `?keyword=...`
   - Hasil pencarian dapat di-bookmark dan di-share

5. **Mengarsipkan Catatan:**

   - Di homepage: klik tombol "Arsipkan" pada card catatan
   - Di halaman detail: klik tombol "Arsipkan"
   - Catatan akan dipindah ke halaman arsip

6. **Melihat Catatan Arsip:**

   - Navigasi ke halaman "Arsip" (`/archived`)
   - Lihat semua catatan yang telah diarsipkan
   - Gunakan pencarian untuk filter catatan arsip

7. **Membatalkan Arsip:**

   - Di halaman arsip: klik "Pindahkan" pada catatan
   - Catatan akan kembali ke halaman utama

8. **Menghapus Catatan:**
   - Klik tombol "Hapus" pada card catatan atau halaman detail
   - Catatan akan dihapus permanen dari sistem

## 🔧 Fitur Teknis

### 🛠️ React Fundamentals

- **Functional Components** - Semua komponen menggunakan function components
- **JSX Syntax** - Modern JSX untuk deklaratif UI
- **Props & State** - Proper data flow dengan props dan useState hook
- **Event Handling** - Interactive UI dengan event handlers
- **Conditional Rendering** - Dynamic UI berdasarkan state

### 🔄 State Management

- **useState Hook** - Local state management untuk components
- **useEffect Hook** - Side effects dan lifecycle management
- **State Lifting** - Shared state management antar components
- **Controlled Components** - Form handling dengan controlled inputs

### 🧭 Routing & Navigation

- **React Router DOM** - Client-side routing untuk SPA
- **Route Configuration** - Nested routing dengan multiple pages
- **URL Parameters** - Dynamic routing dengan `useParams`
- **Search Parameters** - URL search params dengan `useSearchParams`
- **Navigation** - Programmatic navigation dengan `Link` dan `useNavigate`
- **404 Handling** - Catch-all route untuk error pages

### 💾 Data Management

- **Local Data Storage** - In-memory data dengan local-data.js
- **CRUD Operations** - Create, Read, Update, Delete functionality
- **Data Filtering** - Real-time search dan filtering
- **Data Persistence** - State management across route changes

### 📱 Responsive Design

- **Mobile-First** - Design approach untuk semua screen sizes
- **Flexible Grid** - CSS Grid untuk responsive layout
- **Breakpoints** - Media queries untuk different devices
- **Touch-Friendly** - Optimal untuk mobile interactions

## 🎯 Komponen Architecture

### 📄 Pages (Route Components)

- **Homepage** - Main page dengan active notes dan search
- **ArchivedPage** - Archived notes dengan search functionality
- **DetailPage** - Single note detail view
- **AddNotePage** - Form untuk membuat catatan baru
- **NotFoundPage** - 404 error page dengan navigation

### 🧩 Reusable Components

- **Header** - Navigation header dengan menu links
- **Footer** - App footer dengan copyright info
- **SearchBar** - Reusable search input component
- **NotesList** - Grid container untuk multiple notes
- **NoteItem** - Individual note card dengan actions

### 🔧 Utilities

- **local-data.js** - Data management functions (CRUD operations)
- **index.js** - Helper functions untuk date formatting
- **style.css** - Global styling dengan CSS custom properties

## 🎨 Design System

### 🎨 Color Palette

- **Primary Blue**: `#1e40af` - Navigation dan accent colors
- **Gray Scale**: Various shades untuk text dan backgrounds
- **Success Green**: `#10b981` - Positive actions
- **Warning Red**: `#ef4444` - Destructive actions

### 📱 Layout System

- **Container Max-Width**: `1200px` untuk optimal reading
- **Grid System**: CSS Grid dengan responsive columns
- **Spacing Scale**: Consistent margin dan padding values
- **Typography Scale**: Hierarchical heading dan text sizes

## 📊 Data Structure

### 📝 Note Object

```javascript
{
  id: 'notes-1',                    // Unique identifier
  title: 'Note Title',              // Note title (string)
  body: 'Note content...',          // Note content (string)
  createdAt: '2022-04-14T04:27:34.572Z', // ISO date string
  archived: false                   // Archive status (boolean)
}
```

### 🔧 Available Functions

- `getAllNotes()` - Get all notes (active + archived)
- `getActiveNotes()` - Get only active notes
- `getArchivedNotes()` - Get only archived notes
- `getNote(id)` - Get single note by ID
- `addNote({ title, body })` - Add new note
- `deleteNote(id)` - Delete note by ID
- `archiveNote(id)` - Archive note by ID
- `unarchiveNote(id)` - Unarchive note by ID

## 🚦 Status Project

✅ **Completed Features:**

- ✅ Single Page Application dengan React Router
- ✅ CRUD Operations untuk Notes (Create, Read, Delete)
- ✅ Archive/Unarchive functionality
- ✅ Real-time Search dengan URL parameters
- ✅ Responsive design untuk all devices
- ✅ Component-based architecture
- ✅ State management dengan React Hooks
- ✅ Navigation dengan React Router DOM
- ✅ Clean dan modern UI design
- ✅ Error handling dengan 404 page
- ✅ Proper data flow dan state lifting

## 🔮 Potential Enhancements

Untuk pengembangan selanjutnya, aplikasi ini bisa ditingkatkan dengan:

- 🔐 User authentication dan authorization
- 💾 Local Storage atau database integration
- ✏️ Edit note functionality
- 🏷️ Tags/categories untuk notes organization
- 🌙 Dark/Light theme toggle
- 🌍 Multi-language support
- 📤 Export/import notes functionality
- 🔍 Advanced search dengan filters
- 📊 Notes statistics dan analytics
- 📱 Progressive Web App (PWA) features

## 🤝 Pembelajaran

Project ini mengimplementasikan konsep-konsep fundamental React:

### 📚 React Concepts Learned

- **Component Architecture** - Building reusable UI components
- **JSX & Virtual DOM** - Modern JavaScript XML syntax
- **Props & State** - Data flow dan state management
- **Event Handling** - User interaction handling
- **Hooks (useState, useEffect)** - Modern React state management
- **Conditional Rendering** - Dynamic UI based on state
- **Lists & Keys** - Rendering dynamic content efficiently

### 🧭 Routing Concepts

- **Client-side Routing** - SPA navigation tanpa page reload
- **Route Parameters** - Dynamic routes dengan URL params
- **Search Parameters** - URL query parameters handling
- **Nested Routing** - Complex navigation structures
- **Navigation Guards** - Route protection dan error handling

### 🎯 Best Practices Implemented

- **Component Composition** - Building complex UI from simple components
- **Separation of Concerns** - Memisahkan logic, data, dan presentation
- **DRY Principle** - Reusable components dan functions
- **Responsive Design** - Mobile-first approach
- **Clean Code** - Readable dan maintainable code structure

## 📄 Lisensi

© 2025 Ilham Maulana - All Rights Reserved

## 👨‍💻 Developer

**Ilham Maulana**

- Mahasiswa Tingkat 4, Semester 7
- Kelas: Belajar Fundamental Aplikasi Web dengan React
- Submission: Pertama (React Fundamentals & SPA)

---

_Project ini dibuat sebagai submission pertama untuk kelas "Belajar Fundamental Aplikasi Web dengan React" dengan fokus pada implementasi fundamental React concepts, component architecture, routing, dan state management._

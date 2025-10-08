import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  id: {
    // Navigation
    appName: "Aplikasi Catatan Pribadi",
    home: "Beranda",
    detailPage: "Detail Catatan",
    addNotePage: "Tambah Catatan",
    archivedPage: "Catatan Terarsip",
    archived: "Terarsip",
    addNote: "Tambah Catatan",

    // Auth
    hasAccount: "Sudah Punya Akun?",
    noAccount: "Belum Punya Akun?",
    login: "Masuk",
    register: "Daftar",
    logout: "Keluar",
    name: "Nama",
    email: "Email",
    password: "Kata Sandi",
    confirmPassword: "Konfirmasi Kata Sandi",
    loginSuccess: "Berhasil masuk! Selamat datang kembali,",
    loginFailed: "Gagal masuk. Periksa kembali kredensial Anda.",
    registerSuccess: "Pendaftaran berhasil! Silakan masuk.",
    registerFailed: "Pendaftaran gagal. Silakan coba lagi.",

    // Notes
    myNotes: "Catatan Saya",
    archivedNotes: "Catatan Terarsip",
    searchPlaceholder: "Cari catatan...",
    noNotes: "Tidak ada catatan",
    noteTitle: "Judul Catatan",
    noteBody: "Isi Catatan",
    noteCharacterCount: "Karakter",

    // Actions
    save: "Simpan",
    cancel: "Batal",
    delete: "Hapus",
    archive: "Arsipkan",
    unarchive: "Batal Arsip",

    // Messages
    loading: "Memuat...",
    noteCreated: "Catatan berhasil dibuat",
    noteFailed: "Gagal membuat catatan",
    noteUpdated: "Catatan berhasil diperbarui",
    noteDeleted: "Catatan berhasil dihapus",
    noteDeletedFailed: "Gagal menghapus catatan",
    noteArchived: "Catatan berhasil diarsipkan",
    noteArchivedFailed: "Gagal mengarsipkan catatan",
    noteArchivedDeleted: "Catatan terarsip berhasil dihapus",
    noteUnarchived: "Catatan berhasil dibatalkan arsip",
    noteUnarchivedFailed: "Gagal membatalkan arsip catatan",

    // Validation
    required: "Field ini wajib diisi",
    minLength: "Minimal 6 karakter",
    passwordMismatch: "Konfirmasi password tidak cocok",

    // Modal
    confirm: "Konfirmasi",
    confirmDelete: "Konfirmasi Hapus",
    ok: "OK",
    confirmDeleteMessage: "Apakah Anda yakin ingin menghapus catatan ini",

    // 404 Page
    notFoundTitle: "404",
    notFoundSubtitle: "Halaman Tidak Ditemukan",
    notFoundMessage: "Maaf, halaman yang Anda cari tidak dapat ditemukan.",
    backToHome: "🏠 Kembali ke Beranda",

    // Footer
    footerText: "© 2025 Ilham Maulana | Dibuat dengan ❤️ menggunakan React",
  },
  en: {
    // Navigation & Title
    appName: "Personal Notes App",
    home: "Home",
    detailPage: "Note Detail",
    addNotePage: "Add Note",
    archivedPage: "Archived Notes",
    archived: "Archived",
    addNote: "Add Note",

    // Auth
    hasAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    login: "Login",
    register: "Register",
    logout: "Logout",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    loginSuccess: "Login successful! Welcome back,",
    loginFailed: "Login failed. Please check your credentials.",
    registerSuccess: "Registration successful! Please login.",
    registerFailed: "Registration failed. Please try again.",

    // Notes
    myNotes: "My Notes",
    archivedNotes: "Archived Notes",
    searchPlaceholder: "Search notes...",
    noNotes: "No notes available",
    noteTitle: "Note Title",
    noteBody: "Note Content",
    noteCharacterCount: "Characters",

    // Actions
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    archive: "Archive",
    unarchive: "Unarchive",

    // Messages
    loading: "Loading...",
    noteCreated: "Note created successfully",
    noteFailed: "Failed to create note",
    noteUpdated: "Note updated successfully",
    noteDeleted: "Note deleted successfully",
    noteDeletedFailed: "Failed to delete note",
    noteArchived: "Note archived successfully",
    noteArchivedFailed: "Failed to archive note",
    noteArchivedDeleted: "Archived note deleted successfully",
    noteUnarchived: "Note unarchived successfully",
    noteUnarchivedFailed: "Failed to unarchive note",

    // Validation
    required: "This field is required",
    minLength: "Minimum 6 characters",
    passwordMismatch: "Password confirmation does not match",

    // Modal
    confirm: "Confirm",
    confirmDelete: "Confirm Delete",
    ok: "OK",
    confirmDeleteMessage: "Are you sure you want to delete this note",

    // 404 Page
    notFoundTitle: "404",
    notFoundSubtitle: "Page Not Found",
    notFoundMessage: "Sorry, the page you are looking for cannot be found.",
    backToHome: "🏠 Back to Home",

    // Footer
    footerText: "© 2025 Ilham Maulana | Made with ❤️ using React",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "id" ? "en" : "id"));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

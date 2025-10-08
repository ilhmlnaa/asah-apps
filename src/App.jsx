import { useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ToastProvider, useToast } from "./contexts/ToastContext";
import { ToastContainer } from "./components/Toast";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import ArchivedPage from "./pages/ArchivedPage";
import DetailPage from "./pages/DetailPage";
import AddNotePage from "./pages/AddNotePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Loading from "./components/Loading";

import "./styles/style.css";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const { toasts, removeToast } = useToast();

  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("appName");
  }, [t]);

  return (
    <div className="app-container">
      <Header>
        <Navigation />
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <main>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/archived"
              element={
                <ProtectedRoute>
                  <ArchivedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/new"
              element={
                <ProtectedRoute>
                  <AddNotePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <ProtectedRoute>
                  <DetailPage />
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route
              path="*"
              element={
                isAuthenticated ? (
                  <NotFoundPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      )}

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

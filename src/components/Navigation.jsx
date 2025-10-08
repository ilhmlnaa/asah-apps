import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiLogOut, FiGlobe, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Navigation = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* Desktop Navigation */}
      {isAuthenticated && (
        <nav className="navigation desktop-nav">
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                to="/archived"
                className={location.pathname === "/archived" ? "active" : ""}
              >
                {t("archived")}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Hamburger Menu Button */}

      <button className="hamburger-btn" onClick={toggleMobileMenu} title="Menu">
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className="header-controls">
        <button
          className="control-btn"
          onClick={toggleTheme}
          title={
            theme === "light" ? "Switch to dark theme" : "Switch to light theme"
          }
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        <button
          className="control-btn"
          onClick={toggleLanguage}
          title={
            language === "id"
              ? "Switch to English"
              : "Ganti ke Bahasa Indonesia"
          }
        >
          <FiGlobe />
          <span className="lang-text">{language.toUpperCase()}</span>
        </button>

        {isAuthenticated && (
          <>
            <span className="user-name">{user?.name}</span>
            <button
              className="control-btn logout-btn"
              onClick={handleLogout}
              title={t("logout")}
            >
              <FiLogOut />
            </button>
          </>
        )}
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-nav ${isMobileMenuOpen ? "mobile-nav-open" : ""}`}
      >
        <nav className="mobile-navigation">
          {isAuthenticated && (
            <ul>
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/archived"
                  className={location.pathname === "/archived" ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  {t("archived")}
                </Link>
              </li>
            </ul>
          )}

          <div className="mobile-controls">
            <div className="mobile-user-info">
              <span className="user-name">{user?.name}</span>
            </div>

            <div className="mobile-actions">
              <button
                className="control-btn"
                onClick={toggleTheme}
                title={
                  theme === "light"
                    ? "Switch to dark theme"
                    : "Switch to light theme"
                }
              >
                {theme === "light" ? <FiMoon /> : <FiSun />}
              </button>

              <button
                className="control-btn"
                onClick={toggleLanguage}
                title={
                  language === "id"
                    ? "Switch to English"
                    : "Ganti ke Bahasa Indonesia"
                }
              >
                <FiGlobe />
                <span className="lang-text">{language.toUpperCase()}</span>
              </button>

              {isAuthenticated && (
                <button
                  className="control-btn logout-btn"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  title={t("logout")}
                >
                  <FiLogOut />
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;

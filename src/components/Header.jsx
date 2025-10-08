import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function Header({ children }) {
  const { t } = useLanguage();
  return (
    <header>
      <div className="logo">
        <img src="/pencil.png" alt="Header Logo" />
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
          className="logo-text"
        >
          {t("appName")}
        </Link>
      </div>
      {children}
    </header>
  );
}

export default Header;

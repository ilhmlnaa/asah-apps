import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="not-found">
      <h1>{t("notFoundTitle")}</h1>
      <h2>{t("notFoundSubtitle")}</h2>
      <p>{t("notFoundMessage")}</p>
      <Link to="/">{t("backToHome")}</Link>
    </div>
  );
}

export default NotFoundPage;

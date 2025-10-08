import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <p>{t("footerText")}</p>
    </footer>
  );
};

export default Footer;

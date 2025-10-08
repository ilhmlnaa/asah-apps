import { useLanguage } from "../contexts/LanguageContext";

const Loading = ({ type = "page" }) => {
  const { t } = useLanguage();

  return (
    <>
      {type === "page" ? (
        <div className="loading-page">
          <div className="loading-spinner"></div>
          <p>{t("loading")}</p>
        </div>
      ) : (
        <div className="loading-button">
          <div className="loading-spinner-button"></div>
          <span>{t("loading")}</span>
        </div>
      )}
    </>
  );
};

export default Loading;

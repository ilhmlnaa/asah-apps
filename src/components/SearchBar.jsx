import { useLanguage } from "../contexts/LanguageContext";

function SearchBar({ keyword, onSearch }) {
  const { t } = useLanguage();

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;

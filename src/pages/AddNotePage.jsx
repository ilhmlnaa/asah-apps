import { useEffect, useState } from "react";
import { FaSave, FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "../contexts/ToastContext";
import Loading from "../components/Loading";
import useInput from "../hooks/useInput";

function AddNotePage() {
  const [title, onTitleChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showSuccess, showError, showWarning } = useToast();

  useEffect(() => {
    document.title = `${t("addNotePage")} - ${t("appName")}`;
  }, [t]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (body.trim() === "") {
      showWarning(t("required"));
      return;
    }

    setLoading(true);
    try {
      const defaultTitle = "(untitled)";
      const finalTitle = title.trim() === "" ? defaultTitle : title.trim();
      const { error } = await addNote({ title: finalTitle, body });
      if (!error) {
        showSuccess(t("noteCreated"));
        navigate("/");
      } else {
        showError(t("noteFailed"));
      }
    } catch (error) {
      console.error("Error adding note:", error);
      showError(t("noteFailed"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="form-container">
      <h2>{t("addNote")}</h2>

      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="title">{t("noteTitle")}</label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder={t("noteTitle")}
            value={title}
            onChange={onTitleChange}
            maxLength="50"
          />
          <small style={{ color: "var(--on-background-grey)" }}>
            {title.length}/50 {t("noteCharacterCount")}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="body">{t("noteBody")}</label>
          <textarea
            id="body"
            className="form-input form-textarea"
            placeholder={t("noteBody")}
            value={body}
            onChange={onBodyChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <FaSave size={24} /> {t("save")}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            <FaBackspace size={24} /> {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNotePage;

import { useLanguage } from "../contexts/LanguageContext";

function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "confirm",
}) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          {type === "confirm" && (
            <>
              <button className="btn btn-secondary" onClick={onClose}>
                {t("cancel")}
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                {t("confirm")}
              </button>
            </>
          )}
          {type === "alert" && (
            <button className="btn btn-primary" onClick={onClose}>
              {t("ok")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;

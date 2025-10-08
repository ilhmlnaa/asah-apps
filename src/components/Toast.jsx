import { useState, useEffect } from "react";

function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`toast toast-${type} ${
        isVisible ? "toast-show" : "toast-hide"
      }`}
    >
      <div className="toast-content">
        <div className="toast-icon">
          {type === "success" && "✓"}
          {type === "error" && "✗"}
          {type === "warning" && "⚠"}
          {type === "info" && "ℹ"}
        </div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export { Toast, ToastContainer };

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as apiRegister } from "../utils/network-data";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "../contexts/ToastContext";
import Loading from "../components/Loading";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("required");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("required");
    } else if (formData.password.length < 6) {
      newErrors.password = t("minLength");
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t("required");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("passwordMismatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await apiRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (!error) {
        showSuccess(t("registerSuccess"));
        navigate("/login");
      } else {
        showError(t("registerFailed"));
      }
    } catch (error) {
      console.error("Register error:", error);
      showError(t("registerFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t("register")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t("name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full-width"
            disabled={loading}
          >
            {loading ? <Loading type="button" /> : t("register")}
          </button>
        </form>

        <p className="auth-link">
          {t("hasAccount")} <Link to="/login">{t("login")}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  login as apiLogin,
  getUserLogged,
  putAccessToken,
} from "../utils/network-data";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useToast } from "../contexts/ToastContext";
import Loading from "../components/Loading";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
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

    if (!formData.email.trim()) {
      newErrors.email = t("required");
    }

    if (!formData.password.trim()) {
      newErrors.password = t("required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error, data } = await apiLogin(formData);

      if (!error) {
        putAccessToken(data.accessToken);

        const { error: userError, data: userData } = await getUserLogged();
        if (!userError) {
          login(data.accessToken, userData);
          showSuccess(`${t("loginSuccess")} ${userData.name}`);
          navigate("/");
        } else {
          showError(t("loginFailed"));
        }
      } else {
        showError(t("loginFailed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      showError(t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t("login")}</h2>
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="btn btn-primary btn-full-width"
            disabled={loading}
          >
            {loading ? <Loading type="button" /> : t("login")}
          </button>
        </form>

        <p className="auth-link">
          {t("noAccount")} <Link to="/register">{t("register")}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

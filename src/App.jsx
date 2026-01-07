import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingBar from "@dimasmds/react-redux-loading-bar";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import { asyncPreloadProcess } from "./states/shared/action";
import { setThemeActionCreator } from "./states/theme/action";
import { getTheme } from "./utils";

function App() {
  const {
    authUser = null,
    isPreload = false,
    theme = "dark",
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    const savedTheme = getTheme();
    dispatch(setThemeActionCreator(savedTheme));
  }, [dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (isPreload) {
    return <Loading />;
  }

  if (!authUser) {
    return (
      <>
        <LoadingBar style={{ backgroundColor: "#3B82F6", height: "3px" }} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <LoadingBar style={{ backgroundColor: "#3B82F6", height: "3px" }} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation authUser={authUser} theme={theme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

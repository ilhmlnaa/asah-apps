import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Home, Trophy, LogOut, Moon, Sun, LogIn, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { asyncLogoutUser } from '../../states/shared/action';
import { toggleThemeActionCreator } from '../../states/theme/action';
import { LanguageSwitcher } from '../common';

function Navigation({ authUser, theme }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogout = () => {
    setIsLoggingOut(true);
    // Berikan sedikit delay agar animasi loading terlihat lebih halus
    setTimeout(() => {
      dispatch(asyncLogoutUser());
      navigate('/');
      setIsLoggingOut(false);
    }, 600);
  };

  const onToggleTheme = () => {
    dispatch(toggleThemeActionCreator());
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-500"
            >
              {t('navigation.forumApp')}
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>{t('navigation.home')}</span>
              </Link>
              <Link
                to="/leaderboards"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Trophy className="w-5 h-5" />
                <span>{t('navigation.leaderboards')}</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {authUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {authUser.name}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: isLoggingOut ? 1 : 1.05 }}
                  whileTap={{ scale: isLoggingOut ? 1 : 0.95 }}
                  type="button"
                  onClick={onLogout}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <LogOut className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">
                    {isLoggingOut ? t('navigation.loggingOut') : t('navigation.logout')}
                  </span>
                </motion.button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                <LogIn className="w-5 h-5" />
                <span>{t('navigation.login')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-700 dark:text-gray-300"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">{t('navigation.home')}</span>
          </Link>
          <Link
            to="/leaderboards"
            className="flex flex-col items-center space-y-1 px-3 py-2 text-gray-700 dark:text-gray-300"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">{t('navigation.leaderboards')}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  theme: PropTypes.string.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;

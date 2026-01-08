import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Github, Linkedin } from 'lucide-react';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-500 mb-3">
              {t('navigation.forumApp')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('authAside.welcomeMessage')}. {t('authAside.joinCommunity')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm transition-colors"
                >
                  {t('navigation.home')}
                </a>
              </li>
              <li>
                <a
                  href="/leaderboards"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 text-sm transition-colors"
                >
                  {t('navigation.leaderboards')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center">
            Made with{' '}
            <Heart className="w-4 h-4 mx-1 text-red-500" fill="currentColor" />{' '}
            for Dicoding Submission
            <span className="mx-2">•</span>© 2025 {t('navigation.forumApp')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

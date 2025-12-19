import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Tooltip } from './Tooltip';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} position="bottom">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon size={20} className="text-gray-700" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>
    </Tooltip>
  );
};

import { useTheme } from '../hooks/useTheme';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle theme">
      <img
        className="w-7 h-7 cursor-pointer transition-transform duration-300 hover:scale-110"
        src={theme === 'light' ? '/light-mode.svg' : '/dark-mode.svg'}
        alt="theme mode"
      />
    </button>
  );
};

export default ThemeSwitcher;

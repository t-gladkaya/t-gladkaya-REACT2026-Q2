import { Outlet } from 'react-router';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeProvider';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

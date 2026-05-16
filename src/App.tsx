import { Outlet } from 'react-router';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;

import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import MainPage from './pages/mainPage';

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;

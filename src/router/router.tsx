import { createBrowserRouter } from 'react-router';
import App from '../App';
import MainPage from '../pages/mainPage';
import NotFound from '../pages/notFound';
import AboutPage from '../pages/about';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App';
import MainPage from '../pages/mainPage';
import NotFound from '../pages/notFound';
import AboutPage from '../pages/about';
import DetailsPanel from '../components/DetailsPanel';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/page/1" replace />,
      },
      {
        path: 'page/:page',
        element: <MainPage />,
        children: [
          {
            path: 'details/:id',
            element: <DetailsPanel />,
          },
        ],
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

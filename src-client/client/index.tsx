import { createRoot } from 'react-dom/client';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import ReviewPage from './pages/ReviewPage';
import NotFoundPage from './pages/NotFoundPage';
import Root from './routes/Root'
import SettingsPage from './pages/Settings/SettingsPage.tsx';
import WritePage from './pages/WritePage/WritePage';

/*
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}
*/

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const defaultRoute: string = "/write";
const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to={defaultRoute} replace />
      },
      {
        path: '/write',
        element: <WritePage />,

      },
      {
        path: '/review',
        element: <ReviewPage />
      },
      {
        path: '/settings',
        element: <SettingsPage />
      }
    ]
  },
]);

root.render(<RouterProvider router={router}/>);

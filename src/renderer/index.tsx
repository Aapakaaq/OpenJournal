import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ReviewPage from './client/pages/ReviewPage';
import NotFoundPage from './client/pages/NotFoundPage';
import Root from './client/routes/Root'
import SettingsPage from './client/pages/Settings';
import WritePage from './client/pages/WritePage/WritePage';

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/write',
        element: <WritePage />
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

/*
// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
*/

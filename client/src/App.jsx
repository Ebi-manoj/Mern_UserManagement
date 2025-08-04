import { useEffect } from 'react';
import { Login } from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';

const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer theme="light" position="bottom-right" />
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;

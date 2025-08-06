import { Login } from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { Protected, ProtectedAdmin } from './components/ProtectedRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axiosInstance from './utils/axiosInstance';
import { setAuthLoading, setCredintials } from '../store/authSlice';
import { IsLogged } from './components/IsLogged';
import { Admindashboard } from './components/AdminDashboard';

const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: (
      <IsLogged>
        <Login />
      </IsLogged>
    ),
  },
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedAdmin>
        <Admindashboard />
      </ProtectedAdmin>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/refresh');
        dispatch(setCredintials(res.data));
      } catch (error) {
        console.log('No Token', error);
      } finally {
        dispatch(setAuthLoading());
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <ToastContainer theme="light" position="bottom-right" />
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;

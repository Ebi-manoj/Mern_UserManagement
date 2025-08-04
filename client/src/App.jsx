import { useEffect } from 'react';
import { Login } from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from './utils/axiosInstance';

function App() {
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axiosInstance.get('/users/random');
  //     console.log(res);
  //     toast(res.data.message, 'error');
  //   };
  //   fetch();
  // }, []);
  return (
    <div>
      <ToastContainer theme="light" position="bottom-right" />
      <Login />
    </div>
  );
}

export default App;

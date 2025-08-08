import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from './axiosInstance';
import { logout } from '../../store/authSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async () => {
    try {
      const res = await axiosInstance.get('/user/logout');
      dispatch(logout());
      toast.success(res.data.message || 'Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
};

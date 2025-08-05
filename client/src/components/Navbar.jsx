import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { logout } from '../../store/authSlice';
export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await axiosInstance.get('/user/logout');
      dispatch(logout());
      toast(res.data.message || 'Logged Out succefully');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast('Something went wrong');
    }
  }
  return (
    <nav className="bg-gradient-to-r from-blue-400 to-cyan-300 text-black flex justify-center py-5">
      <ul className="flex gap-10 items-center  text-l">
        <Link to="/">
          <li className="cursor-pointer">Home</li>
        </Link>
        <Link to="/profile">
          <li className="cursor-pointer">Profile</li>
        </Link>
        <li className="cursor-pointer" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
};

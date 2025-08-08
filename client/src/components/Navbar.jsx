import { Link } from 'react-router-dom';
import { useLogout } from '../utils/hooks';

export const Navbar = () => {
  const handleLogout = useLogout();

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

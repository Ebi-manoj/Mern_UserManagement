import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const IsLogged = ({ children }) => {
  const { user } = useSelector(store => store.auth);
  console.log(user);
  return user ? <Navigate to="/" /> : children;
};

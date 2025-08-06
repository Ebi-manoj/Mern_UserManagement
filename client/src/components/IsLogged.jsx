import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const IsLogged = ({ children }) => {
  const { user } = useSelector(store => store.auth);

  if (user && !user.isAdmin) return <Navigate to="/" />;

  if (user && user.isAdmin) return <Navigate to="/admin/dashboard" />;

  return children;
};

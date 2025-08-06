import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loading } from './Loading';

export const Protected = ({ children }) => {
  console.log('Print here');
  const { user, authLoading } = useSelector(store => store.auth);
  console.log('user fom potected', user);
  if (authLoading) return <Loading />;
  return user && !user.isAdmin ? children : <Navigate to="/login" />;
};

export const ProtectedAdmin = ({ children }) => {
  const { user, authLoading } = useSelector(store => store.auth);
  if (authLoading) return <Loading />;
  return user && user.isAdmin ? children : <Navigate to="/login" />;
};

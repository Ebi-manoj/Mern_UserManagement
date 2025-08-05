import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Protected = ({ children }) => {
  console.log('Print here');
  const { user, authLoading } = useSelector(store => store.auth);
  console.log('user fom potected', user);
  if (authLoading) return <div>loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

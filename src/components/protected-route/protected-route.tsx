import { useSelector } from '../../services/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

export const ProtectedRoute = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user.isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (user.isLoading) {
    return <Preloader />;
  }

  return <Outlet />;
};

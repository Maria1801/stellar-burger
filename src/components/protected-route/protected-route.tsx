import { useSelector } from '../../services/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  needAuth: boolean;
};

export const ProtectedRoute = ({ needAuth }: ProtectedRouteProps) => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = getCookie('accessToken') != undefined;
  const location = useLocation();

  if (needAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (!needAuth && isAuthenticated) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  if (user.isLoading) {
    return <Preloader />;
  }

  return <Outlet />;
};

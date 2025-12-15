import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);  // here
  const isAdmin = isLoggedIn && token && user?.role === 'admin';

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
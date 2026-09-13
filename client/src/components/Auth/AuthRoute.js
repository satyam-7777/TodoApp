import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Loader from "../Loader/Loader";

export default function AuthRoute({ type }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <Loader />;
  }

  if (type === "protected" && !user) {
    return <Navigate to="/" replace />;
  }

  if (type === "public" && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

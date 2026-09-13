import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Loader from "../Loader/Loader";

export default function AuthRoute({ type }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (type === "protected" && !user) {
    return <Navigate to="/login" replace />;
  }

  if (type === "public" && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

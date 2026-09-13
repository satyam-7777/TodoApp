import { useAuth } from "../../context/authContext";
import Loader from "../Loader/Loader";
import "./Auth.css";

export default function AuthCard({ children }) {
  const { loading } = useAuth();
  return (
    <div className="auth-card-container">
      {loading && <Loader />}
      <div className="auth-card">{children}</div>
    </div>
  );
}

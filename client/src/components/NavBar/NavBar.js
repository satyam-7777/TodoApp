import { Link } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import "./NavBar.css";
import { useAuth } from "../../context/authContext";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks />
    </nav>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <CheckSquare className="icon logo-icon" aria-hidden="true" />
      <Link className="link logo-title" to="/">
        TodoApp
      </Link>
    </div>
  );
}

export function NavLinks() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="nav-links">
      <ul>
        {user ? (
          <>
            <li>
              <Link className="link dashboard-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li>
              <button onClick={logoutUser} className="logout-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="link login-link" to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link className="link signup-link" to="/signup">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

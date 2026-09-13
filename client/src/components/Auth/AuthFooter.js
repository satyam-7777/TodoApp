import { Link } from "react-router-dom";
import "./Auth.css";

export default function AuthFooter({ type }) {
  const isLogin = type === "login";

  const footerText = isLogin ? "Don't have an account?" : "Already have an account?";

  const linkText = isLogin ? "Sign Up" : "Login";
  const linkPath = isLogin ? "/signup" : "/login";

  return (
    <div>
      <p>
        {footerText}{" "}
        <Link className="footer-link" to={linkPath}>
          {linkText}
        </Link>
      </p>
    </div>
  );
}

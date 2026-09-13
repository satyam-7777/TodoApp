import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-card">
        <AlertCircle className="not-found-icon" />

        <h1>404</h1>
        <h2>Page not found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>

        <Link to="/" className="home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

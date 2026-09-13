import { Heart } from "lucide-react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <span>&copy; 2026 TodoApp</span>
      <p>
        Made with <Heart className="heart-icon" />
      </p>
    </footer>
  );
}

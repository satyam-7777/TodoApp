import "./Auth.css";

export default function AuthCard({ children }) {
  return (
    <div className="auth-card-container">
      <div className="auth-card">{children}</div>
    </div>
  );
}

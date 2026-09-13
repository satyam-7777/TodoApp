import "./Error.css";

export default function Error({ message }) {
  return (
    <div className="error-container" role="alert">
      <span className="error-icon">!</span>
      <p className="error-message">{message}</p>
    </div>
  );
}

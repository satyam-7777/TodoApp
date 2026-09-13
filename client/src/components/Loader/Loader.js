import "./Loader.css";

export default function Loader({ message = "Please wait..." }) {
  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  );
}

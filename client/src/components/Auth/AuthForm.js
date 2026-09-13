import "./Auth.css";
import { useState } from "react";
import Field from "./Field";

import { useNavigate } from "react-router-dom";
import { useAuth, authAPI } from "../../context/authContext";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

const initialStateSignup = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const initialStateLogin = {
  email: "",
  password: "",
};

export default function AuthForm({ type, formFields, submitBtnText, message }) {
  const initialState = type === "signup" ? initialStateSignup : initialStateLogin;

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const navigate = useNavigate();

  function handleChange(e) {
    // setting error to null on input change
    setError("");

    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await authAPI(formData, type, message);

      setUser(response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {loading && <Loader />}
      {error && <Error message={error} />}

      {formFields.map((fieldItem, index) => (
        <Field fieldItem={fieldItem} handleChange={handleChange} key={fieldItem.name} />
      ))}

      <button className="btn submit-btn" type="submit" disabled={loading}>
        {loading ? "Please wait..." : submitBtnText}
      </button>
    </form>
  );
}

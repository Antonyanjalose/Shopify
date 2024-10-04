// frontend/src/components/Register.jsx
import React, { useState, useContext } from "react";
import { registerUser } from "../api/api";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { data } = await registerUser(email, password);
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="container">
     
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="form-section">
         <h2>Register</h2>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          minLength="6"
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          minLength="6"
        />

        <button type="submit" className="auth-button">
          Register
        </button>
        <p>
        Already have an account? <Link to="/">Login here</Link>.
      </p>
      </form>
      
    </div>
  );
};

export default Register;

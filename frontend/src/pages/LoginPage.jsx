import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Replace with your Spring Boot endpoint
//      const response = await axios.post("http://128.140.102.156:8080/api/auth/authenticate", {
      const response = await axios.post("https://api.manageyself.com/api/auth/authenticate", {
        username,
        password
      });

      // Assuming your backend returns { token: "jwt.token.here" }
      const token = response.data.token;
      
      // Store the token in localStorage
      sessionStorage.setItem("token", token);
      //console.log("Token stored in sessionStorage:", token);
      // Set default Authorization header for future requests
      //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      navigate("/admin"); // Redirect to admin panel
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;

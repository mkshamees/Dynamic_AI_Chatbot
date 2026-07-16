import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Remove any previous token
      localStorage.removeItem("token");

      // Save new token
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      console.log(
        "NEW TOKEN:",
        response.data.access_token
      );

      navigate("/chat");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.detail ||
        "Login failed."
      );

    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Dynamic AI Chatbot</h1>

        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {error && <p>{error}</p>}

      </div>
    </div>
  );
}

export default Login;
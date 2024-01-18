import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../auth/AuthConstants";

import "./LoginForm.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);

        if (json.token) {
          auth.saveUser(json);
        }
      } else {
        const json = await response.json();

        setErrorResponse(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // si el usuario está autenticado, redirige al dashboard del usuario
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className={`container ${username !== "" && "active"}`}>
        <input
          required=""
          type="text"
          id="username"
          name="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <label htmlFor="username" className="label">
          Nombre de usuario
        </label>
      </div>

      <div className={`container ${password !== "" && "active"}`}>
        <input
          required=""
          type="password"
          id="password"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <label htmlFor="password" className="label">
          Contraseña
        </label>
      </div>
      <button>Iniciar sesión</button>
    </form>
  );
}

import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../auth/AuthConstants";

import "./LoginForm.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const auth = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (!username || !password) {
      // valido que ambos campos estén completos
      setErrorResponse("Por favor, completa ambos campos.");
      return;
    }

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
      } else if (response.status === 401) {
        // muestro error si las credenciales son incorrectas
        setErrorResponse("Nombre de usuario o contraseña incorrecto.");
      } else {
        const json = await response.json();
        setErrorResponse(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // si el usuario está autenticado, redirijo al dashboard del usuario
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
      {isFormSubmitted && errorResponse && (
        <p className="error-message">{errorResponse}</p>
      )}
      <button>Iniciar sesión</button>
    </form>
  );
}

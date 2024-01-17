import { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <div className="container">
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

      <div className="container">
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
      <button>Login</button>
    </form>
  );
}

export default LoginForm;

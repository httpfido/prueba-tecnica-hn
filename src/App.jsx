import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import { useAuth } from "./auth/AuthProvider";
import { Navigate } from "react-router-dom";

function App() {
  const auth = useAuth();

  console.log(auth.isAuthenticated);
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <h1 className="logo react">Prueba de React</h1>
      <p className="secondary-parragraph" style={{ marginBottom: "2rem" }}>
        Por favor, introduzca su nombre de usuario y contraseña
      </p>
      <LoginForm />
    </>
  );
}

export default App;

import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
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

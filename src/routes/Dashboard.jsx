import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import "./Dashboard.css";

function Dashboard() {
  const auth = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTasks() {
    try {
      console.log({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth.getAccessToken()}`,
        },
        body: { idUsuario: auth.getUser().id_usuario },
      });
      const response = await fetch(
        "https://apisdms.dls-archer.com:12864/ats/tareas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ idUsuario: auth.getUser().id_usuario }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        setTasks(json);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // indica que la carga ha finalizado, ya sea exitosa o no
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="container">
          <div>
            {tasks.length ? (
              tasks.map((task) => (
                <div key={task.id_tarea}>
                  <span className="">
                    <p>Id</p>
                    <p className="secondary-parragraph">{task?.id_tarea}</p>
                  </span>
                  <span>
                    <p>Nombre</p>
                    <p className="secondary-parragraph">{task?.nombre_tarea}</p>
                  </span>
                  <span>
                    <p>Video</p>
                    <p className="secondary-parragraph">{task?.video_tarea}</p>
                  </span>
                </div>
              ))
            ) : (
              <p>No hay tareas</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

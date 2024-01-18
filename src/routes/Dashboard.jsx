import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { fetchTaskAndTest } from "../adapters/fetch";
import "./Dashboard.css";

function Dashboard() {
  const auth = useAuth();
  const [tasks, setTasks] = useState([]);
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTaskAndTest(auth, setTasks, setTests, setIsLoading);
  }, []);

  return (
    <div>
      <h1>
        Dashboard de {`${auth.getUser().nombre} ${auth.getUser().apellido}`}
      </h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="main-container">
          <div className="container w-50">
            <div>
              Lista de tareas
              {tasks.length ? (
                tasks.map((task, index) => (
                  <div
                    key={index}
                    className={`task-container ${
                      index !== tasks.length - 1 && "line"
                    }`}
                  >
                    <span className="property">
                      <p className="content">Id</p>
                      <p className="secondary-parragraph content">
                        {task?.id_tarea}
                      </p>
                    </span>
                    <span className="property">
                      <p className="content">Nombre</p>
                      <p className="secondary-parragraph content">
                        {task?.nombre_tarea}
                      </p>
                    </span>
                    <span className="property">
                      <p className="content">Video</p>
                      <p className="secondary-parragraph content">
                        {task?.video_tarea}
                      </p>
                    </span>
                  </div>
                ))
              ) : (
                <p className="secondary-parragraph">No hay tareas</p>
              )}
            </div>
          </div>
          <div className="container w-50">
            <div>
              Lista de evaluaciones
              {tests.length ? (
                tasks.map((test, index) => (
                  <div
                    key={index}
                    className={`task-container ${
                      index !== tests.length - 1 && "line"
                    }`}
                  >
                    <span className="property">
                      <p className="content">Id</p>
                      <p className="secondary-parragraph content">
                        {test?.id_tarea}
                      </p>
                    </span>
                    <span className="property">
                      <p className="content">Nombre</p>
                      <p className="secondary-parragraph content">
                        {test?.nombre_tarea}
                      </p>
                    </span>
                    <span className="property">
                      <p className="content">Video</p>
                      <p className="secondary-parragraph content">
                        {test?.video_tarea}
                      </p>
                    </span>
                  </div>
                ))
              ) : (
                <p className="secondary-parragraph">No hay evaluaciones</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

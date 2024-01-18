import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { fetchTaskAndTest } from "../adapters/fetch";
import "./Dashboard.css";

import React from "react";

const TaskList = ({ items, listTitle }) => (
  <div className="container w-50">
    <div>
      {listTitle}
      {items.length ? (
        items.map((item, index) => (
          <div
            key={index}
            className={`task-container ${index !== items.length - 1 && "line"}`}
          >
            {Object.entries(item).map(([key, value]) => (
              <span className="property" key={key}>
                <p className="content">{key}</p>
                <p className="secondary-parragraph content">{value}</p>
              </span>
            ))}
          </div>
        ))
      ) : (
        <p className="secondary-parragraph">No hay {listTitle.toLowerCase()}</p>
      )}
    </div>
  </div>
);

function Dashboard() {
  const auth = useAuth();
  const [tasks, setTasks] = useState([]);
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTaskAndTest(auth, setTasks, setTests, setIsLoading);
  }, []);
  const logOut = () => {
    auth.signout();
  };

  return (
    <div>
      <button
        onClick={logOut}
        style={{ position: "absolute", right: 0, top: 0 }}
      >
        Cerrar sesión
      </button>
      <h2>
        Dashboard de {`${auth.getUser().nombre} ${auth.getUser().apellido}`}
      </h2>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="main-container">
          <TaskList items={tasks} listTitle="Lista de tareas" />
          <TaskList items={tests} listTitle="Lista de evaluaciones" />
        </div>
      )}
    </div>
  );
}
export default Dashboard;

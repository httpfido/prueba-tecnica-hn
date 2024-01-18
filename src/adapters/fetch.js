import { API_URL } from "../auth/AuthConstants";

export async function fetchTasks(auth, setTasks) {
  try {
    console.log("data para el fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth.getAccessToken()}`,
      },
      body: { idUsuario: auth.getUser().id_usuario },
    });
    const response = await fetch(`${API_URL}/ats/tareas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth.getAccessToken()}`,
      },
      body: JSON.stringify({ idUsuario: auth.getUser().id_usuario }),
    });
    if (response.ok) {
      const json = await response.json();
      setTasks(json);
    } else {
      console.log("respuesta sin json token");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchTests(auth, setTests) {
  try {
    console.log("data para el fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth.getAccessToken()}`,
      },
      body: { idUsuario: auth.getUser().id_usuario },
    });
    const response = await fetch(`${API_URL}/ats/evaluaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth.getAccessToken()}`,
      },
      body: JSON.stringify({ idUsuario: auth.getUser().id_usuario }),
    });
    if (response.ok) {
      const json = await response.json();
      setTests(json);
    } else {
      console.log("respuesta sin json token");
    }
  } catch (error) {
    console.log(error);
  }
}

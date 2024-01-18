import { API_URL } from "../auth/AuthConstants";
import axios from "axios";

export async function fetchTasks(auth, setTasks, setIsLoading) {
  try {
    const accessToken = auth.getAccessToken();
    console.log("accessToken", accessToken, {
      idUsuario: auth.getUser().id_usuario,
    });
    const response = await axios.post(
      `${API_URL}/ats/tareas`,
      { idUsuario: auth.getUser().id_usuario },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );

    if (response.status === 200) {
      setTasks(response.data);
    }
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.error(error);
  }
}
export async function fetchTests(auth, setTests, setIsLoading) {
  try {
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
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("respuesta sin json token");
    }
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
}

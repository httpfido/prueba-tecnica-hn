import { API_URL } from "../auth/AuthConstants";
import axios from "axios";

export async function fetchTaskAndTest(auth, setTasks, setTests, setIsLoading) {
  try {
    const accessToken = auth.getAccessToken();
    const idUsuario = auth.getUser().id_usuario;
    const responseTasks = await axios.post(
      `${API_URL}/ats/tareas`,
      { idUsuario },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    const responseTests = await axios.post(
      `${API_URL}/ats/evaluaciones`,
      { idUsuario },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    if (responseTasks.status === 200) {
      setTasks(responseTasks.data);
    }
    if (responseTests.status === 200) {
      setTests(responseTests.data);
    }
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.error(error);
  }
}

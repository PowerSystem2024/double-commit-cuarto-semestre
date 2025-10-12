import { useMemo, useState } from "react";
import { Loader } from "../components/Loader";
import { useFetch } from "../hooks/useFectch";
import type { PartialTasksProps } from "../definitions";
import { TaskCard } from "../components/TaskCard";
import { showDialog } from "../utils/dialog";

export const TasksPage = () => {
  const [reload, setReload] = useState(false); // 👈 bandera para recargar

  const options = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include" as const,
    }),
    []
  );

  const initialTasks: PartialTasksProps = {
    message: "",
    tareas: [],
  };

  const { data = initialTasks, loading, error } = useFetch<PartialTasksProps>(
    `http://localhost:5000/api/tareas?reload=${reload}`, // 👈 fuerza cambio en URL
    options
  );

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/eliminar/tarea/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      showDialog({
        content: (
          <div>
            <h3>Se eliminó la tarea</h3>
            <p>{data.message}</p>
          </div>
        ),
      });

      // 🔁 recargar lista
      setReload((prev) => !prev);
    } catch (err) {
      showDialog({ content: <div>{String(err)}</div> });
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="flex justify-center mx-auto bg-violet-400 mt-24">
        <div className="flex justify-center flex-col">
          <h1 className="text-2xl">No hay tareas creadas</h1>
          <a href="/create-task" className="text-center hover:underline">
            Crear la primera!
          </a>
        </div>
      </div>
    );

  return (
    <div className="mt-24 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">
          Lista de Tareas {data?.tareas?.length}
        </h1>
        <a
          href="/create-task"
          className="flex gap-2 items-center px-3 py-2 bg-violet-400 border-violet-300 border rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Crear Tarea
        </a>
      </div>
      <TaskCard tareas={data?.tareas} deleteTask={deleteTask} />
    </div>
  );
};

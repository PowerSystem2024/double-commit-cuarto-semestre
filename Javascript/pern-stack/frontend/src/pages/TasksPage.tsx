import { useEffect, useMemo, useState } from "react";
import { Loader } from "../components/Loader";
import { useFetch } from "../hooks/useFectch";
import type { PartialTasksProps } from "../definitions";
import { TaskCard } from "../components/TaskCard";
import { showDialog } from "../utils/dialog";
import { useNavigate } from "react-router-dom";

export const TasksPage = () => {
  const navigate = useNavigate()
  const options = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include" as const,
    }),
    []
  );

  const {
    data: initialData,
    loading,
    error,
  } = useFetch<PartialTasksProps>("http://localhost:5000/api/tareas", options);

  const [data, setData] = useState<PartialTasksProps>({
    tareas: [],
  });

  useEffect(() => {
    if (initialData?.tareas) setData(initialData);
  }, [initialData]);

  if (loading) return <Loader />;

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/eliminar/tarea/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();
      showDialog({
        content: (
          <div>
            <h3>Se eliminó la tarea</h3>
            {data.tarea.titulo}
          </div>
        ),
      });
      setData((prev) => ({
        ...prev,
        tareas: prev.tareas?.filter((tarea) => tarea.tarea_id !== id),
      }));
    } catch (err) {
      showDialog({ content: <div>{String(err)}</div> });
    }
  };

  if (error && !data?.tareas?.length) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-xl shadow-md text-center">
          <h1 className="text-xl font-semibold text-red-700 dark:text-red-300">
            Error al cargar las tareas
          </h1>
          <p className="text-sm text-red-500 dark:text-red-400 mt-2">
            {error.message || "No se pudo obtener la lista de tareas."}
          </p>
          <a
            href="/create-task"
            className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Crear nueva tarea
          </a>
        </div>
      </div>
    );
  }

  if (data?.tareas?.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            No hay tareas creadas aún
          </h1>
          <button
            onClick={() => navigate("/create-task")}
            className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Crear la primera
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Lista de Tareas ({data?.tareas?.length})
        </h1>
        <button
          onClick={() => navigate("/create-task")}
          className="flex gap-2 items-center px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
          Nueva Tarea
        </button>
      </div>

      <TaskCard tareas={data?.tareas} deleteTask={deleteTask} />
    </div>
  );
};

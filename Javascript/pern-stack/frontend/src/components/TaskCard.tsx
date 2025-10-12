import type { PartialTasksProps } from "../definitions";

export const TaskCard = ({ tareas, deleteTask }: PartialTasksProps) => {
  return (
    <div>
      <ul className="grid grid-cols-3 gap-4">
        {tareas?.map((task) => (
          <div
            key={task.tarea_id}
            className="flex flex-col border dark:border-zinc-800/50 dark:bg-zinc-900/50 p-5 rounded-xl relative"
          >
            <h3 className="text-xl font-bold">{task.titulo}</h3>
            <time>
              {new Date(task.creado_el).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <p className="mt-3">{task.descripcion}</p>
            <span 
            title={`Eliminar tarea ${task.tarea_id}`} 
            className="absolute top-2 right-2 p-2 border dark:border-zinc-800/50 rounded-xl hover:bg-red-400/80"
            onClick={() => deleteTask && deleteTask(task.tarea_id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ddd"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-icon lucide-trash"
              >
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};

import { useFetch } from "../hooks/useFectch";

interface TasksPageProps {
    id: number;
    titulo: string;
    descripcion: boolean;
    actualizado: boolean;
    creado_el: Date | string
}

export const TasksPage = () => {
    const { data, loading, error } = useFetch<TasksPageProps[]>("http://loaclhost:5000/api/tareas")
    
    if (loading) {
        return (
            <div>
                <div>
                    <h4>Cargando...</h4>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
            <ul className="space-y-2">
                {data?.map((task) => (
                    <p>{task.titulo}</p>
                ))}
            </ul>
            {error && (
                <small>{error.message}</small>
            )}
        </div>
    );
};
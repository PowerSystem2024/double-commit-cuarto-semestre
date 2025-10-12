import type { PartialTasksProps, PartialUserProps } from "../definitions";
import { useFetch } from "../hooks/useFectch";
import { formatDate } from "../utils/formatDate";
import { Loader } from "../components/Loader";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../utils/dialog";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const options = useMemo(
    () => ({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include" as const,
    }),
    []
  );

  const { data, loading, error } = useFetch<PartialUserProps>(
    "http://localhost:5000/api/profile",
    options
  );

  if (error) {
    return navigate("/login");
  }

  if (loading) {
    return <Loader />;
  }

  const deleteUser = async (id: number) => {
    await fetch("http://localhost:5000/api/delete/user/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: PartialTasksProps) => {
        showDialog({ content: <div>{data.message}</div> });
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => showDialog({ content: <div>{err}</div> }));
  };

  const signout = async () => {
    await fetch("http://localhost:5000/api/signout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: PartialUserProps) => {
        showDialog({ content: 
        <div>
            <p>{data.message}</p>
            <p>Hasta luego {data.user?.user_name}!</p>
       </div> });
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => showDialog({ content: <div>{err}</div> }));
  };

  return (
    <section className="max-w-2xl flex mx-auto justify-center">
      <div className="w-full p-5 bg-[#fff] dark:bg-zinc-900/50 rounded-xl border-zinc-300 dark:border-zinc-800/50 border text-zinc-800 dark:text-zinc-100 mt-24">
        <h1 className="text-2xl font-bold mb-4">Perfil del usuario</h1>
        <div className="flex items-center mb-4">
          <img
            src={data?.user?.user_avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{data?.user?.user_name}</h2>
            <p className="text-gray-600">{data?.user?.user_email}</p>
          </div>
        </div>
        <p className="mb-2">
          Creado el: {formatDate(data?.user?.created_at as string)}
        </p>
        <aside className="flex gap-4 items-center justify-evenly">
          <button className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
            Editar Perfil
          </button>
          <button
            onClick={() => deleteUser(data?.user?.user_id as number)}
            className="mt-4 bg-red-500 text-white rounded px-4 py-2"
          >
            Eliminar Perfil
          </button>
          <button className="mt-4 bg-green-500 text-white rounded px-4 py-2">
            Mis Tareas
          </button>
          <button
            onClick={signout}
            className="mt-4 bg-red-500 text-white rounded px-4 py-2"
          >
            Cerrar Sesión
          </button>
          <button className="mt-4 bg-green-500 text-white rounded px-4 py-2">
            Mis Tareas
          </button>
        </aside>
      </div>
    </section>
  );
};

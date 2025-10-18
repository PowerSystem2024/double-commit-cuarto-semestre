import type { PartialTasksProps, PartialUserProps } from "../definitions";
import { useFetch } from "../hooks/useFectch";
import { formatDateAndTime } from "../utils/formatDate";
import { Loader } from "../components/Loader";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { showDialog } from "../utils/dialog";

export const ProfileUser = () => {
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
        showDialog({
          content: (
            <div>
              <p>{data.message}</p>
              <p>Hasta luego {data.user?.user_name}!</p>
            </div>
          ),
        });
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => showDialog({ content: <div>{err}</div> }));
  };

  return (
    <section className="max-w-3xl flex mx-auto justify-center px-4">
      <div className="w-full p-8 bg-white/90 dark:bg-zinc-900/70 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl mt-24 backdrop-blur">
        <h1 className="text-3xl font-bold mb-6 text-center text-zinc-900 dark:text-zinc-100 tracking-tight">
          Perfil de Usuario
        </h1>

        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-8 mb-8">
          <img
            src={
              data?.user?.user_avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-500/70 shadow-md object-cover transition-transform hover:scale-105"
          />
          <div className="mt-5 sm:mt-0 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {data?.user?.user_name}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {data?.user?.user_email}
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
              Cuenta creada el {formatDateAndTime(data?.user?.created_at as string)}
            </p>
          </div>
        </div>

        <aside className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/profile/edit")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-pen-to-square"></i>
            Editar Perfil
          </button>

          <button
            onClick={() => deleteUser(data?.user?.user_id as number)}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl shadow-md hover:bg-rose-700 hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-user-xmark"></i>
            Eliminar Cuenta
          </button>

          <button
            onClick={() => navigate("/tareas")}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-list-check"></i>
            Mis Tareas
          </button>

          <button
            onClick={signout}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-white rounded-xl shadow-md hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Cerrar Sesión
          </button>
        </aside>
      </div>
    </section>
  );
};

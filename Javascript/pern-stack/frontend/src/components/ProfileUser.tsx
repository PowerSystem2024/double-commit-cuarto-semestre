import type { PartialUserProps } from "../definitions";
import { formatDateAndTime } from "../utils/formatDate";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/userProvider";
import { showDialog } from "../utils/dialog";

export const ProfileUser = () => {
  const navigate = useNavigate();
  const { auth, isLoading, signout, deleteUser } = useAuth();
  const [data, setData] = useState<PartialUserProps>({ user: auth?.user });

  useEffect(() => {
    if (auth?.user) {
      setData({ user: auth.user });
    }
  }, [auth]);

  if (isLoading) return <Loader />;

  const handleDeleteUser = async () => {
    showDialog({
      content: (
        <div>
          <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
          <aside>
            <button
             onClick={async() => {
              await deleteUser(data?.user?.user_id as number);
              navigate("/login");
            }}
            className="px-2 py-1 border">
              Si estoy de acuerdo
            </button>
            <button className="px-2 py-1 border">
              Na me arrepentí
            </button>
          </aside>
        </div>
      )
    })
  };

  return (
    <section className="max-w-3xl flex mx-auto justify-center px-4">
      <div className="w-full p-8 bg-white/90 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-xl mt-24 backdrop-blur">
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
              Cuenta creada el{" "}
              {formatDateAndTime(data?.user?.created_at as string)}
            </p>
          </div>
        </div>

        <aside className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/profile/edit")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white  shadow-md hover:bg-indigo-700 hover:shadow-lg transition-transform "
          >
            <i className="fa-solid fa-pen-to-square"></i>
            Editar Perfil
          </button>

          <button
            onClick={handleDeleteUser}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white  shadow-md hover:bg-rose-700 hover:shadow-lg transition-transform "
          >
            <i className="fa-solid fa-user-xmark"></i>
            Eliminar Cuenta
          </button>

          <button
            onClick={() => navigate("/tareas")}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white  shadow-md hover:bg-emerald-700 hover:shadow-lg transition-transform "
          >
            <i className="fa-solid fa-list-check"></i>
            Mis Tareas
          </button>

          <button
            onClick={signout}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-white  shadow-md hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 hover:shadow-lg transition-transform "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out-icon lucide-log-out"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
            Cerrar Sesión
          </button>
        </aside>
      </div>
    </section>
  );
};

import { formatDateAndTime } from "../../utils/formatDate";
import { Loader } from "../Layout/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/userProvider";
import { showDialog } from "../../utils/dialog";

export const ProfileUser = () => {
  const navigate = useNavigate();
  const { auth, isLoading, deleteUser, refreshUser } = useAuth();

  useEffect(() => {
    const fetchNewData = async () => {
      await refreshUser();
    };
    fetchNewData();
  }, [refreshUser]);

  if (isLoading) return <Loader />;

  const handleDeleteUser = async () => {
    document.querySelector("dialog")?.remove();
    showDialog({
      content: (
        <div>
          Usuario{" "}
          <strong className="text-rose-500">{auth?.user?.user_name}</strong> y
          correo{" "}
          <strong className="text-rose-500">{auth?.user?.user_email}</strong>{" "}
          eliminado!
        </div>
      ),
    });
    await deleteUser(auth?.user?.user_id as number);
  };

  const confirmDeleteUser = async () => {
    showDialog({
      content: (
        <article className="flex justify-center mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-rose-600">
              ¿Eliminar tu cuenta?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Esta acción{" "}
              <span className="font-semibold">no se puede deshacer</span>.
              Perderás todos tus datos y tareas asociadas.
            </p>
            <aside className="flex gap-4 items-center justify-center mt-4">
              <button
                onClick={handleDeleteUser}
                className="px-2 py-1 border hover:outline-1 outline-offset-2 outline-rose-600 hover:text-rose-600"
              >
                {isLoading ? "Eliminando..." : "Sí, estoy de acuerdo"}
              </button>
              <button
                onClick={() => document.querySelector("dialog")?.remove()}
                className="px-2 py-1 border hover:outline-1 outline-offset-2"
              >
                No, me arrepentí
              </button>
            </aside>
          </div>
        </article>
      ),
    });
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
              auth?.user?.user_avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-500/70 shadow-md object-cover transition-transform hover:scale-105"
          />
          <div className="mt-5 sm:mt-0 text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {auth?.user?.user_name}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {auth?.user?.user_email}
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-cake-icon lucide-cake"
              >
                <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                <path d="M2 21h20" />
                <path d="M7 8v3" />
                <path d="M12 8v3" />
                <path d="M17 8v3" />
                <path d="M7 4h.01" />
                <path d="M12 4h.01" />
                <path d="M17 4h.01" />
              </svg>
              Cuenta creada el{" "}
              {formatDateAndTime(auth?.user?.created_at as string)}
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-rotate-cw-icon lucide-rotate-cw"
              >
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              Cuenta actualizada el{" "}
              {formatDateAndTime(auth?.user?.updated_at as string)}
            </p>
          </div>
        </div>

        <aside className="flex flex-wrap justify-center gap-4 mt-8">
          {/* Editar perfil */}
          <button
            onClick={() => navigate("/profile/edit")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg transition-transform"
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Editar Perfil
          </button>

          {/* Eliminar cuenta */}
          <button
            onClick={confirmDeleteUser}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white shadow-md hover:bg-rose-600 hover:shadow-lg transition-transform"
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
              <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
              <circle cx="12" cy="7" r="4" />
              <line x1="22" x2="18" y1="11" y2="15" />
              <line x1="18" x2="22" y1="11" y2="15" />
            </svg>
            Eliminar Cuenta
          </button>

          {/* Mis tareas */}
          <button
            onClick={() => navigate("/tareas")}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white shadow-md hover:bg-emerald-600 hover:shadow-lg transition-transform"
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
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Mis Tareas
          </button>
        </aside>
      </div>
    </section>
  );
};

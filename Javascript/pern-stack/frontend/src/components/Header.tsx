import { useAuth } from "../contexts/userProvider";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const { auth, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate("/login");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-list-todo text-blue-600 dark:text-blue-400"
          >
            <path d="M13 5h8" />
            <path d="M13 12h8" />
            <path d="M13 19h8" />
            <path d="m3 17 2 2 4-4" />
            <rect x="3" y="4" width="6" height="6" rx="1" />
          </svg>
          <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
            PERNO App
          </span>
        </div>
        {/* Si hay usuario */}
        {auth && auth.user ? (
          <div className="flex items-center gap-4">
            <Link to={"/profile"} className="flex items-center gap-2">
              <img
                src={
                  auth?.user?.user_avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={auth?.user?.user_name}
                className="w-9 h-9 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
              />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {auth?.user?.user_name || "No disponible"}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-in"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Ingresar
          </button>
        )}
      </nav>
    </header>
  );
};

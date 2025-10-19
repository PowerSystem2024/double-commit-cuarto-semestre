import { useAuth } from "../../contexts/userProvider";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const { auth, signout, isLoading } = useAuth();
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
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-500"
        >
          <img src="/vite.svg" width={33} height={33} />
          <span className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#57B4FF] via-[#8D70FE] to-[#BD34FE]">
            doubleCommit taskApp
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
                className="w-9 h-9 rounded-full object-cover border border-zinc-300 dark:border-zinc-700 hover:outline-4 outline-indigo-500/60 transition-colors duration-500"
              />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {auth?.user?.user_name || "No disponible"}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-44 px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {isLoading ? "Cerrando sesión" : "Cerrar sesión"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition group relative active:outline outline-blue-500 outline-offset-2 z-50"
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
              <path
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                className="group-hover:scale-105 group-hover:-translate-x-5.5 translate-x-0.5 transition-transform duration-500"
              />
              <polyline
                points="10 17 15 12 10 7"
                className="group-hover:translate-x-1 transition-transform duration-500"
              />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Ingresar
            <div className="absolute top-0 right-3 w-[100px] h-[50px] rounded-full bg-blue-700 blur-2xl shadow-2xl shadow-blue-500 group-hover:opacity-100 opacity-0 transition-opacity duration-500 -z-10 translate-[-50% -50%]" />
          </button>
        )}
      </nav>
    </header>
  );
};

import { useNavigate } from "react-router-dom";
import { showDialog } from "../utils/dialog";
import { useEffect } from "react";
import { useAuth } from "../contexts/userProvider";

export const Home = () => {
  const { auth } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      const worker = new Worker(
        new URL("../workers/timerWorker.ts", import.meta.url)
      );
  
      worker.postMessage(1000);
      worker.onmessage = (event: MessageEvent<number>) => {
        const timer = event.data;
  
        if (typeof timer !== "number") return;
  
        if (timer === 3) {
          showDialog({
            content: (
              <div className="p-4 text-center space-y-2">
                <h2 className="text-xl font-semibold text-violet-600">
                  Bienvenido de nuevo 👋 {auth.user?.user_name}
                </h2>
                <p className="text-gray-700">
                  Estas son tus tareas diarias, esas mismas que parecen
                  rutinarias…
                </p>
                <p className="text-gray-500 italic">
                  Para que vamos a ser tan optimistas!?
                </p>
              </div>
            ),
          });
  
          return () => setTimeout(() => worker.terminate(), 500);
        }
      };
    }
  }, [auth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-5xl font-extrabold bg-clip-text bg-gradient-to-t from-blue-400 to-blue-600 text-transparent tracking-tight">
          Bienvenido a tu Gestor de Tareas
        </h1>

        <p className="text-lg text-gray-700">
          Organiza tu día con facilidad, prioriza lo importante y alcanza tus objetivos sin estrés.
        </p>

        <p className="text-gray-500 italic">
          “Una tarea a la vez, un paso más cerca del éxito.”
        </p>

        <div className="mt-8">
          <button
            onClick={() => navigate("/tareas")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition transform hover:scale-105 hover:shadow-blue-600/50 shadow-2xl"
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

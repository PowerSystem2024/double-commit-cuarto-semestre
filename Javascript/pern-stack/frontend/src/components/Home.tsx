import { useNavigate } from "react-router-dom";
import { showDialog } from "../utils/dialog";

export const Home = () => {
  const navigate = useNavigate()
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
              Bienvenido de nuevo 👋
            </h2>
            <p className="text-gray-700">
              Estas son tus tareas diarias, esas mismas que parecen rutinarias…
            </p>
            <p className="text-gray-500 italic">
              Para que vamos a ser tan optimistas!?
            </p>
          </div>
        ),
      });
  
      setTimeout(() => worker.terminate(), 500);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Bienvenidos a la App de Tareas
      </h1>
      <p className="text-lg text-blue-300">
        <span className="text-xl ">
          Crea y gestiona tus tareas de manera sencilla y eficiente.
        </span>
      </p>
      <div className="mt-6">
        <button
          onClick={() => navigate("/tareas")}
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
        >
          Comenzar
        </button>
      </div>
    </div>
  );
};

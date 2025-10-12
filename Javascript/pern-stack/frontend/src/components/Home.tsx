import { showDialog } from "../utils/dialog";

export const Home = () => {
  const worker = new Worker(
    new URL("../workers/timerWorker.ts", import.meta.url)
  );
  worker.postMessage(1000);

  worker.onmessage = (event: MessageEvent) => {
    const timer = event.data;

    if (timer === 3) {
      showDialog({
        content: (
          <div>
            Bienvenidos a sus Tareas diarias de todos los días rutinarias y un
            tanto despreciables, aunque todo mensaje diga 'todo bien!!' que
            triste historia!!
          </div>
        ),
      });
      worker.terminate();
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
        <a href="/tareas" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Comenzar
        </a>
      </div>
    </div>
  );
};

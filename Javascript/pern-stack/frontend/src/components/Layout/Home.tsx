import { useNavigate } from "react-router-dom";
import { showDialog } from "../../utils/dialog";
import { useEffect } from "react";
import { useAuth } from "../../contexts/userProvider";
import { UserAvatarsGroup } from "../UsersAvatarsGoup";

export const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const users = [
    {
      id: "1",
      name: "Cecilia Olejarczyk",
      avatar: "https://avatars.githubusercontent.com/u/104603137?v=4",
      github: "https://github.com/CeciliaOlejar",
    },
    {
      id: "2",
      name: "Franco Morales",
      avatar: "https://avatars.githubusercontent.com/u/134340520?v=4",
      github: "https://github.com/Xeneixxe",
    },
    {
      id: "3",
      name: "Gabriel Calcagni",
      avatar: "https://avatars.githubusercontent.com/u/93176365?v=4",
      github: "https://github.com/solidsnk86",
    },
  ];

  useEffect(() => {
    if (auth?.user) {
      const executed = JSON.parse(localStorage.getItem("executed") || "false");

      // Si ya se ejecutó antes, no mostrar el cartel
      if (executed === true) return;

      // Si no se ejecutó, lo marcamos como ejecutado
      localStorage.setItem("executed", JSON.stringify(true));

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
                  Para qué vamos a ser tan optimistas!?
                </p>
              </div>
            ),
          });

          setTimeout(() => worker.terminate(), 500);
        }
      };
    }
  }, [auth]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-2xl">
        <p className="welcome-p w-fit mx-auto text-[#FFC820] italic text-sm px-2 bg-gradient-to-br from-[#57B4FF] via-[#8D70FE] to-[#BD34FE] border border-zinc-400/50 rounded-full">
          “Una tarea a la vez, un paso más cerca del éxito.”
        </p>
        <h1 className="welcome-h1 text-[3.3rem] font-extrabold bg-clip-text bg-gradient-to-t from-blue-400 to-blue-600 text-transparent">
          Bienvenido a tu Gestor de Tareas
        </h1>

        <p className="text-lg text-gray-400 my-1">
          Organiza tu día con facilidad, prioriza lo importante y alcanza tus
          objetivos sin estrés.
        </p>

        <div className="mt-8">
          <button
            onClick={() => navigate("/tareas")}
            className="welcome-btn px-6 py-3 bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition transform hover:scale-105 hover:shadow-blue-600/50 shadow-2xl"
          >
            Comenzar ahora
          </button>
        </div>
      </div>
      <div className="flex px-4 py-2 mt-10">
        <UserAvatarsGroup users={users} size={45} />
      </div>
    </div>
  );
};

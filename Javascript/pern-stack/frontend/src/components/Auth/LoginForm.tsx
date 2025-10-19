import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/userProvider";
import { BackButton } from "../BackButton";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { signin, auth, error, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signin(email, password);
    } catch (err) {
      console.error("Error en inicio de sesión:", err);
    }
  };

  useEffect(() => {
    if (auth?.user) navigate("/profile");
  }, [auth, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BackButton />
      <div className="bg-white bg-opacity-30 backdrop-blur-md border-zinc-300 shadow-lg p-8 text-zinc-800">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 transition duration-200 ${
              isLoading
                ? "bg-zinc-400 cursor-not-allowed"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-3">
            *{error.message}
          </p>
        )}

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

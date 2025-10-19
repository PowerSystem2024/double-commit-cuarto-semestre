import { useState, type FormEvent } from "react";
import { showDialog } from "../../utils/dialog";
import { BackButton } from "../BackButton";
import { useNavigate } from "react-router-dom";
import type { PartialUserProps } from "../../definitions";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data: PartialUserProps) => {
        setIsLoading(false)
        navigate("/profile")
        showDialog({
          content: (
            <div className="p-4">
              <h3 className="text-lg font-semibold">¡Registro exitoso!</h3>
              <p className="mt-2">Usuario: {data?.user?.user_name}</p>
              <p className="mt-1">Correo: {data?.user?.user_email}</p>
            </div>
          ),
        });
      }).catch((err) => {
        setIsLoading(false)
        showDialog({ content: <div>{err.message}</div> })
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BackButton />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 text-zinc-800 shadow-md w-96"
      >
        <h2 className="text-lg font-bold mb-4">Registro</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nombre de usuario
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300  p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300  p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300  p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-zinc-800 text-white p-2 hover:bg-zinc-700"
        >
          {isLoading ? "Cargando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "./BackButton";
import { Loader } from "./Loader";

export const TaskForm = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [descripcion]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tarea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ titulo, descripcion }),
      });

      if (!res.ok) throw new Error("Error al crear la tarea");

      setLoading(false);
      navigate("/tareas");
    } catch (err) {
      setLoading(false);
      console.error("Error al guardar la tarea:", err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BackButton />
      <div className="bg-white bg-opacity-30 backdrop-blur-md border border-zinc-300 shadow-lg p-8 text-zinc-800 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Crear Nueva Tarea
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              placeholder="Ej: Comprar server"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              ref={textareaRef}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400 resize-none overflow-hidden"
              placeholder="Ej: Comprar dominio en Hostinguer"
              required
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-800 text-white py-2 hover:bg-zinc-700 transition duration-200"
          >
            Agregar tarea
          </button>
        </form>
      </div>
    </div>
  );
};

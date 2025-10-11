export const LoginForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
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
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
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

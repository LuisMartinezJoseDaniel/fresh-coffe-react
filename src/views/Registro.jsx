import { Link } from "react-router-dom";

export const Registro = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Crea tu cuenta </h1>
      <p>Crea tu cuenta llenando el formulario</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="w-full block text-slate-800">
              Nombre:
            </label>
            <input
              type="text"
              className="mt-2 w-full block p-3 bg-gray-50"
              id="name"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="w-full block text-slate-800">
              Email:
            </label>
            <input
              type="email"
              className="mt-2 w-full block p-3 bg-gray-50"
              id="email"
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="w-full block text-slate-800">
              Contraseña:
            </label>
            <input
              type="password"
              className="mt-2 w-full block p-3 bg-gray-50"
              id="password"
              placeholder="Ingresa tu Contraseña"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="w-full block text-slate-800"
            >
              Repetir contraseña:
            </label>
            <input
              type="password_confirmation"
              className="mt-2 w-full block p-3 bg-gray-50"
              id="password_confirmation"
              placeholder="Repite tu contraseña"
            />
          </div>
          <button
            type="submit"
            className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          >
            Registrarse
          </button>
        </form>
        <nav>
          <Link to="/auth/login" className="hover:text-indigo-800 mt-4 block">
            {" "}
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

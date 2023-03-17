import { Categoria } from "./Categoria";

import { useQuiosco } from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth";

export const Sidebar = () => {
  const { logout, user } = useAuth({ middleware: "auth" });
  const { categorias } = useQuiosco();

  return (
    <aside className="md:w-72 h-screen overflow-y-scroll">
      <div className="p-4">
        <img src="/img/logo.svg" alt="Imagen de logo" className="w-40" />
      </div>
      <p className="my-10 text-xl text-center">Hola: {user?.name}</p>
      <nav className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>

      {/* <form onSubmit={handleSubmit} className="my-5 px-5 "> */}
      <button
        onClick={logout}
        // type="submit"
        className="p-3 w-full text-center bg-red-500 truncate text-white"
      >
        Cancelar Órden
      </button>
      {/* </form> */}
    </aside>
  );
};

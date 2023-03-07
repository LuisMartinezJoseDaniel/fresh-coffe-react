import { Categoria } from "./Categoria";

import { useQuiosco } from "../hooks/useQuiosco";

export const Sidebar = () => {
  const { categorias } = useQuiosco();
  

  return (
    <aside className="md:w-72 h-screen overflow-y-scroll">
      <div className="p-4">
        <img src="/img/logo.svg" alt="Imagen de logo" className="w-40" />
      </div>
      <nav className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>

      <div className="my-5 px-5 ">
        <button className="p-3 w-full text-center bg-red-500 truncate text-white">
          Cancelar Órden
        </button>
      </div>
    </aside>
  );
};

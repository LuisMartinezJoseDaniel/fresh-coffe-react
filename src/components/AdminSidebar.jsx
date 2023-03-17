import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminSidebar = () => {
  const { logout } = useAuth({ middleware: "auth" });

  return (
    <aside className="md:w-72 h-screen">
      <div className="p-4">
        <img src="/img/logo.svg" alt="Imagen logotipo" className="w-40" />
      </div>

      <nav className="flex flex-col p-4">
        <Link to="/admin" className="font-bold text-lg">
          Ordenes
        </Link>
        <Link to="/admin/productos" className="font-bold text-lg">
          Productos
        </Link>
      </nav>

      <button
        onClick={logout}
        // type="submit"
        className="p-3 w-full text-center bg-red-500 truncate text-white"
      >
        Cerrar sesión
      </button>
    </aside>
  );
};

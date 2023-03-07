import React from "react";
import { useQuiosco } from "../hooks/useQuiosco";

export const Categoria = ({ categoria }) => {
  const { icono, nombre } = categoria;
  const { handleClickCategoria, categoriaActual } = useQuiosco();

  return (
    <button
      onClick={() => handleClickCategoria(categoria)}
      className={`flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer ${
        categoria.id === categoriaActual.id ? "bg-amber-400" : ""
      }`}
    >
      <img
        src={`/img/icono_${icono}.svg`}
        alt={`Imagen categoria - ${nombre}`}
        className="w-24"
      />
      <p className="font-bold text-lg cursor-pointer truncate">{nombre}</p>
    </button>
  );
};

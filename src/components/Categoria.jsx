import React from "react";
import { useQuiosco } from "../hooks/useQuiosco";

export const Categoria = ({ categoria }) => {
  const { icon, name } = categoria;
  const { handleClickCategoria, categoriaActual } = useQuiosco();

  return (
    <button
      onClick={() => handleClickCategoria(categoria)}
      className={`flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer ${
        categoria.id === categoriaActual.id ? "bg-amber-400" : ""
      }`}
    >
      <img
        src={`/img/icono_${icon}.svg`}
        alt={`Imagen categoria - ${name}`}
        className="w-24"
      />
      <p className="font-bold text-lg cursor-pointer truncate">{name}</p>
    </button>
  );
};

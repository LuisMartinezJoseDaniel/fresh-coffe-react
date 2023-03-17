import React from "react";
import { formatearDinero } from "../helpers";
import { useQuiosco } from "../hooks/useQuiosco";

export const Producto = ({ producto }) => {
  const { name, price, image } = producto;
  const { handleClickModal, handleClickProducto } = useQuiosco();

  const handleProductSelected = () => {
    handleClickModal();
    handleClickProducto(producto);
  };

  return (
    <div className="border p-5 shadow bg-white">
      <img src={`/img/${image}.jpg`} alt={`image ${name}`} className="w-full" />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(price)}
        </p>
      </div>
      <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-800 mt-5 p-3 text-white w-full uppercase font-bold"
        onClick={handleProductSelected}
      >
        Agregar
      </button>
    </div>
  );
};

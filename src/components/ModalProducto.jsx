import React, { useEffect, useState } from "react";
import { formatearDinero } from "../helpers";
import { useQuiosco } from "../hooks/useQuiosco";

export const ModalProducto = () => {
  const [cantidad, setCantidad] = useState(1);
  const { producto, handleClickModal, handleAgregarPedido, pedido } =
    useQuiosco();

  const [edicion, setEdicion] = useState(false);

  const onAddProduct = () => {
    handleAgregarPedido({ ...producto, cantidad });
    handleClickModal();
  };

  useEffect(() => {
    const productoEnPedido = pedido.find((p) => p.id === producto.id);
    if (productoEnPedido) {
      setEdicion(true);
      setCantidad(productoEnPedido.cantidad);
      return;
    }
    setEdicion(false);
  }, [pedido]);

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <img
          src={`/img/${producto.image}.jpg`}
          alt={`Imagen producto ${producto.name}`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleClickModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5 ">{producto.name}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearDinero(producto.price)}
        </p>

        <div className="flex gap-4 mt-5">
          <button
            onClick={() => {
              if (cantidad <= 1) {
                return;
              }
              setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button
            onClick={() => {
              if (cantidad >= 10) {
                return;
              }
              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
          onClick={onAddProduct}
        >
          {edicion ? "Actualizar cantidad" : "Agregar al pedido"}
        </button>
      </div>
    </div>
  );
};

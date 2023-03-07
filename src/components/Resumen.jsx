import React from "react";
import { formatearDinero } from "../helpers";
import { useQuiosco } from "../hooks/useQuiosco";
import { ResumenProducto } from "./ResumenProducto";

export const Resumen = () => {
  const { pedido, total } = useQuiosco();

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>
      <p className="text-lg my-5">
        Aquí pordrás ver el resumen y totales del resumen
      </p>
      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">
            No hay elementos en tu pedido aún
          </p>
        ) : (
          pedido.map((producto) => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )}

        <p className="text-xl mt-10">Total: {formatearDinero(total)}</p>
        <form className="w-full">
          <div className="mt-5">
            <input
              type="submit"
              className={`  ${
                pedido.length
                  ? "hover:bg-indigo-800 cursor-pointer bg-indigo-600"
                  : "bg-indigo-200"
              } px-5 py-2 rounded uppercase w-full font-bold text-white text-center`}
              value="Confirmar pedido"
              disabled={!pedido.length}
            />
          </div>
        </form>
      </div>
    </aside>
  );
};

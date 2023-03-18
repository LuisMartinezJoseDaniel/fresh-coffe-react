import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import axiosClient from "../api/axios";
import { formatearDinero } from "../helpers/currency";

const token = localStorage.getItem("AUTH_TOKEN");
const fetcher = (url) =>
  axiosClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
export const Ordenes = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/orders", fetcher);

  if (isLoading) return <p>Cargando...</p>;

  const handleCompletarOrden = (id) => {
    try {
      axiosClient.put(`/api/orders/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      mutate();

      toast.success("Orden completada correctamente");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-black py-5">Órdenes</h1>
      <p className="text-2xl my-10">Administra las órdenes aquí</p>

      <div className="grid grid-cols-2">
        {data.data.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
          >
            <p className="text-xl font-bold text-slate-600">
              Contenido del pedido:
            </p>
            {pedido.products.map((producto) => (
              <div
                key={producto.id}
                className="border-b border-b-slate-200 last-of-type:border-none py-4"
              >
                <p className="text-sm">ID {producto.id}</p>
                <p className="text-sm"> {producto.name}</p>
                <p className="text-sm">
                  {" "}
                  Cantidad:{" "}
                  <span className="font-bold">{producto.cantidad}</span>
                </p>
              </div>
            ))}
            <p className="text-lg font-bold text-slate-600">
              Cliente:
              <span className="font-bold"> {pedido.user.name}</span>
            </p>
            <p className="text-lg font-bold text-amber-600">
              Total:{" "}
              <span className="font-bold">{formatearDinero(pedido.total)}</span>
            </p>
            <button
              type="button"
              className={`hover:bg-indigo-800 cursor-pointer bg-indigo-600
               px-5 py-2 rounded uppercase w-full font-bold text-white text-center`}
              onClick={() => handleCompletarOrden(pedido.id)}
            >
              Completar pedido
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

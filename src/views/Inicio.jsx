import React, { useMemo } from "react";
import useSWR from "swr";
import axiosClient from "../api/axios";
import { Producto } from "../components/Producto";

import { useQuiosco } from "../hooks/useQuiosco";

const token = localStorage.getItem("AUTH_TOKEN");
const fetcher = (url) =>
  axiosClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.data.data);
export const Inicio = () => {
  const { categoriaActual } = useQuiosco();
  const { data, error, isLoading } = useSWR("/api/products", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading || !data || !categoriaActual) {
    return <>Cargando</>;
  }

  const productos = data.filter(
    (producto) => producto.categoryId === categoriaActual.id
  );

  return (
    <div className="">
      <h1 className="text-4xl font-black py-5">{categoriaActual?.name}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuacion
      </p>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto key={producto.id} producto={producto} botonAgregar />
        ))}
      </div>
    </div>
  );
};

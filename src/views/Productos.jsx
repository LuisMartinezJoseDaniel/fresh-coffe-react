import React from "react";
import useSWR from "swr";
import axiosClient from "../api/axios";
import { Producto } from "../components/Producto";

const token = localStorage.getItem("AUTH_TOKEN");
const fetcher = (url) =>
  axiosClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data.data);
export const Productos = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/products", fetcher);

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-4xl font-black py-5">Productos</h1>
      <p className="text-2xl my-10">Maneja la disponibilidad desde aquí</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {data.map((producto) => (
          <Producto key={producto.id} producto={producto} botonDisponible />
        ))}
      </div>
    </div>
  );
};

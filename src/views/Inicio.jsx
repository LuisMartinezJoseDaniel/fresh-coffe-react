import React from 'react'
import { Producto } from '../components/Producto'
import { productos as productsDB } from '../data/productos'
import { useQuiosco } from '../hooks/useQuiosco'

export const Inicio = () => {
  const { categoriaActual } = useQuiosco()
  
  const productos = productsDB.filter(
    (producto) => producto.categoria_id === categoriaActual.id
  );

  return (
    <div className="">
      <h1 className="text-4xl font-black py-5">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuacion
      </p>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto key={producto.imagen} producto={producto} />
        ))}
      </div>
    </div>
  );
}

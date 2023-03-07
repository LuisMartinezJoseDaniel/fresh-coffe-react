import { createContext, useEffect, useState } from "react";
import { categorias as categoriasDB } from "../data/categorias";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB);
  const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
  const [modal, setModal] = useState(false);

  const [pedido, setPedido] = useState([]);

  const [producto, setProducto] = useState({});

  const [total, setTotal] = useState(0);

  const handleClickCategoria = (categoria) => {
    setCategoriaActual(categoria);
  };

  const handleClickModal = () => {
    setModal(!modal);
  };

  const handleClickProducto = (producto) => {
    setProducto(producto);
  };

  const handleAgregarPedido = ({ categoria_id, ...producto }) => {
    const productoExiste = pedido.find((p) => p.id === producto.id);

    if (productoExiste) {
      const pedidoActualizado = pedido.map((p) =>
        p.id === producto.id ? producto : p
      );

      setPedido(pedidoActualizado);
      toast.success("Producto actualizado correctamente!");
    } else {
      setPedido([...pedido, producto]);
      toast.success("Producto agregado al pedido");
    }
  };

  const handleEliminarProductoPedido = (id) => {
    const pedidoActualizado = pedido.filter((p) => p.id !== id);
    setPedido(pedidoActualizado);
  };

  useEffect(() => {
    const total = pedido.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    setTotal(total);
  }, [pedido]);

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        modal,
        producto,
        pedido,
        total,
        // Methods
        handleClickCategoria,
        handleClickModal,
        handleClickProducto,
        handleAgregarPedido,
        handleEliminarProductoPedido,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export default QuioscoContext;

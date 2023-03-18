import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../api/axios";

const QuioscoContext = createContext();

export const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState();
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

  const handleAgregarPedido = ({ categoryId, ...producto }) => {
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

  const handleSubmitNuevaOrden = async (logout) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await axiosClient.post(
        "/api/orders",
        {
          total,
          productos: pedido.map((producto) => ({
            id: producto.id,
            cantidad: producto.cantidad,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setTimeout(() => {
        setPedido([]);
      }, 1000);

      setTimeout(() => {
        logout();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarcarProdutoAgotado = async (id) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await axiosClient.put(`/api/products/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const total = pedido.reduce(
      (acc, producto) => acc + producto.price * producto.cantidad,
      0
    );
    setTotal(total);
  }, [pedido]);

  const obtenerCategorias = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    try {
      const { data } = await axiosClient("/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategorias(data.data);

      setCategoriaActual(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerCategorias();
  }, []);

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
        handleSubmitNuevaOrden,
        handleMarcarProdutoAgotado,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export default QuioscoContext;

import { Outlet } from "react-router-dom";
import { Resumen } from "../components/Resumen";
import { Sidebar } from "../components/Sidebar";
import { useQuiosco } from "../hooks/useQuiosco";
import ReactModal from "react-modal";
import { Producto } from "../components/Producto";
import { ModalProducto } from "../components/ModalProducto";
import { ToastContainer } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

export const Layout = () => {
  const { modal } = useQuiosco();

  return (
    <>
      <div className="md:flex">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </main>
        <Resumen />
      </div>
      <ReactModal isOpen={modal} style={customStyles}>
        <ModalProducto />
      </ReactModal>

      <ToastContainer />
    </>
  );
};

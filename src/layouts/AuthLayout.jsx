import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const AuthLayout = () => {
  return (
    <main className="max-w-4xl mx-auto mt-10 md:mt-10 flex flex-col md:flex-row items-center">
      <img src="/img/logo.svg" alt="Imagen logotipo" className="max-w-xs" />
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
};

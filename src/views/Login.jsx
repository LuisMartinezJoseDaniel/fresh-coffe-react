import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta.jsx";
import { useAuth } from "../hooks/useAuth.jsx";

export const Login = () => {
  const [errors, setErrors] = useState();

  const emailRef = createRef();
  const passwordRef = createRef();

  const { login } = useAuth({ middleware: "guest", url: "/" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const datos = {
      email,
      password,
    };

    login(datos, setErrors);
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Iniciar sesión</h1>
      <p>Para crear un pedido debes iniciar sesión</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errors &&
            errors.map((error, index) => <Alerta key={index}>{error}</Alerta>)}
          <div className="mb-4">
            <label htmlFor="email" className="w-full block text-slate-800">
              Email:
            </label>
            <input
              type="email"
              className="mt-2 w-full block p-3 bg-gray-50"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="w-full block text-slate-800">
              Contraseña:
            </label>
            <input
              type="password"
              className="mt-2 w-full block p-3 bg-gray-50"
              id="password"
              name="password"
              placeholder="Ingresa tu Contraseña"
              ref={passwordRef}
            />
          </div>

          <button
            type="submit"
            className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          >
            Ingresar
          </button>
        </form>
        <nav>
          <Link
            to="/auth/register"
            className="hover:text-indigo-800 mt-4 block"
          >
            {" "}
            ¿Aún no tienes cuenta? Crea una
          </Link>
        </nav>
      </div>
    </>
  );
};

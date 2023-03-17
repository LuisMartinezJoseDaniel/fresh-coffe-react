import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axios";
import { Alerta } from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export const Registro = () => {
  const { register } = useAuth({
    middleware: "guest",
    url: "/",
  });

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;

    const datos = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    register(datos, setErrors);
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Crea tu cuenta </h1>
      <p>Crea tu cuenta llenando el formulario</p>
      <div className="mt-5">
        {errors.map((error, index) => (
          <Alerta key={index}>{error}</Alerta>
        ))}
      </div>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="w-full block text-slate-800">
              Nombre:
            </label>
            <input
              type="text"
              className="mt-2 w-full block p-3 bg-gray-50"
              id="name"
              name="name"
              ref={nameRef}
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="w-full block text-slate-800">
              Email:
            </label>
            <input
              type="email"
              className="mt-2 w-full block p-3 bg-gray-50"
              ref={emailRef}
              id="email"
              placeholder="Ingresa tu email"
              name="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="w-full block text-slate-800">
              Contraseña:
            </label>
            <input
              type="password"
              className="mt-2 w-full block p-3 bg-gray-50"
              ref={passwordRef}
              id="password"
              name="password"
              placeholder="Ingresa tu Contraseña"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="w-full block text-slate-800"
            >
              Repetir contraseña:
            </label>
            <input
              type="password"
              className="mt-2 w-full block p-3 bg-gray-50"
              ref={passwordConfirmationRef}
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Repite tu contraseña"
            />
          </div>
          <button
            type="submit"
            className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          >
            Registrarse
          </button>
        </form>
        <nav>
          <Link to="/auth/login" className="hover:text-indigo-800 mt-4 block">
            {" "}
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </nav>
      </div>
    </>
  );
};

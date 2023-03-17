import React from "react";

export const Alerta = ({ children }) => {
  return (
    <div className="text-center my-2 bg-red-600 text-white uppercase font-bold p-3">
      {children}
    </div>
  );
};

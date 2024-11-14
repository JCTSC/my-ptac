'use client'
import Link from "next/link";
import PerfilUsuario from "../interface/perfilUsuario";
import React from "react";


const PaginaPerfil = () =>{
    const usuario = {
      id: 1,
        nome : 'H',
        email: "teste@gmail.com",
        idade : '10',
        password: "n1gg4",
        tipo: "adm",
    }

    return (
      <>
        <div className="w-[90%] md:w-1/2 mx-auto  p-8 rounded-lg  mt-8 min-h-screen flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Perfil do Usuário</h1>
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700">Informações do Perfil</h2>
                <p className="text-gray-600">
                  Nome: <span className="font-medium text-blue-600">{usuario.nome}</span>
                </p>
                <p className="text-gray-600">
                  Email: <span className="font-medium text-blue-600">{usuario.email}</span>
                </p>
                <p className="text-gray-600">
                  Tipo: <span className="font-medium text-blue-600">{usuario.tipo}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <button className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                  Editar Perfil
                </button>
                
              </div>
            </div>
           
          </div>
        </div>
      </>
    );
  };
  
  export default PaginaPerfil;
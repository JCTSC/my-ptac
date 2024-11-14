'use client';
import Link from "next/link";
import PerfilUsuario from "../interface/perfilUsuario";
import React from "react";

const PaginaPerfil = () => {
  const usuario = {
    id: 1,
    nome: 'H',
    email: "teste@gmail.com",
    idade: '10',
    password: "n1gg4",
    tipo: "adm",
  };

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Idade:</strong> {usuario.idade}</p>
      <p><strong>Tipo:</strong> {usuario.tipo}</p>
      <Link href="/editar-perfil">Editar Perfil</Link>
    </div>
  );
};

export default PaginaPerfil;

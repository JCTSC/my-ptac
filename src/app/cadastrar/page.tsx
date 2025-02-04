'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Usuario from "../interface/usuario";
import { ApiURL } from "../config";
import ResponseSignin from "../interface/response";
import { setCookie } from "nookies";

export default function Cadastrar() {
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    password: '',
    tipo: 'cliente'
  });
  const [msgError, setMsgError] = useState<string | null>(null);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(`${ApiURL}/auth/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
    if (response) {
      const data: ResponseSignin = await response.json()
      const { erro, mensagem, token = '' } = data;
      console.log(data)
      if (erro) {
        setMsgError(mensagem)
      } else {
        setCookie(undefined, 'restaurant-token', token, {
          maxAge: 60 * 60 * 1 // 1 hora
        })
        router.push('/')
      }
    } else {
      setMsgError("Resposta não respondida");
    }

    // Aqui você pode adicionar lógica para enviar os dados para o seu backend
    console.log('Usuário cadastrado:', usuario);
  }

  const alterarNome = (novoNome: string) => {

    setUsuario((usuarioAnterior) => ({
      ...usuarioAnterior,
      nome: novoNome
    }));
  }

  const alterarEmail = (novoEmail: string) => {
    setUsuario((usuarioAnterior) => ({
      ...usuarioAnterior,
      email: novoEmail
    }));
  }

  const alterarPassword = (novoPassword: string) => {
    setUsuario((usuarioAnterior) => ({
      ...usuarioAnterior,
      password: novoPassword
    }));
  }

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105">
          <center><h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Cadastro</h2></center>
          <form onSubmit={handleRegister} className="space-y-6">
            <center>
              <input
                type="text"
                value={usuario.nome}
                onChange={(e) => alterarNome(e.target.value)}
                placeholder="Nome completo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </center>
            <center>
              <input
                type="email"
                value={usuario.email}
                onChange={(e) => alterarEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </center>
            <center>
              <input
                type="password"
                value={usuario.password}
                onChange={(e) => alterarPassword(e.target.value)}
                placeholder="Senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </center>
            {msgError && <p className="text-red-500 text-sm text-center">{msgError}</p>}
            <center>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-900 text-white text-lg font-medium rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Cadastrar
              </button>
            </center>
          </form>
          <center>
            <p className="mt-6 text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-yellow-700 font-semibold hover:underline">
                Faça login
              </Link>
            </p>
          </center>
        </div>
      </div>
    </>
  );
}

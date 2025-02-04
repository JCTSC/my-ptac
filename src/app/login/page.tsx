'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { parseCookies, setCookie } from "nookies";
import { ApiURL } from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (token) {
      router.push('/')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response) {
        const data = await response.json();
        const { erro, mensagem, token } = data
        console.log(data)
        if (erro) {
          setMsgError(mensagem)
        } else {
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60 * 60 * 1 //1 hora
          })
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Erro na requisicao', error)
    }

    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <center>
            <h2 className="text-2xl font-bold text-center text-teal-700">Login</h2>
          </center>

          <form onSubmit={handleLogin} className="space-y-6">
            <center>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </center>
            <center>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </center>
            {msgError && <p className="text-red-500 text-sm text-center">{msgError}</p>}
            <center>
              <button
                type="submit"
                className="sw-full py-2 bg-yellow-900 text-white text-lg font-medium rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Entrar
              </button>
            </center>
          </form>
          <center>
            <p className="mt-6 text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/cadastrar" className="text-yellow-700 font-semibold hover:underline">
                Cadastre-se
              </Link>
            </p>
          </center>
        </div>
      </div>
    </>
  );
}

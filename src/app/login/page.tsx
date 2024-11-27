'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "nookies";
import "../page.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.erro) {
        setError(data.msg || "Erro ao fazer login. Tente novamente.");
      } else {
        
        setCookie(null, "restaurant-token", data.token, {
          maxAge: 60 * 60, 
          path: "/", 
        });

        
        router.push("/");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

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
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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

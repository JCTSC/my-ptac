'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "nookies"; // Biblioteca para manipular cookies

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
        // Salva o token no cookie
        setCookie(null, "restaurant-token", data.token, {
          maxAge: 60 * 60, // 1 hora
          path: "/", // Disponível em toda a aplicação
        });

        // Redireciona para a página inicial
        router.push("/");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105">
          <center>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
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
                className="w-full py-2 bg-yellow-900 text-white text-lg font-medium rounded-lg hover:bg-yellow-600 transition duration-300"
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

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function verificarLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    if (email !== "a@gmail.com" || password !== "nota10") {
      setError("Informações inexistentes ou faltando com o nosso regulamento.");
      return;
    }
    setError("");
    router.push("/logado");
  }

  return (
    <> 
      <div className="w-full h-screen bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105">
          <center><h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Cadastro</h2></center>
          <form onSubmit={verificarLogin} className="space-y-6">
          <center> <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            /></center>
         <center>   <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            /></center>
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

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nome || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (nome.length < 6) {
      setError("O nome deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, password }),
      });

      const data = await response.json();
      if (data.erro) {
        setError(data.msg || "Erro ao cadastrar usuário.");
      } else {
        setSuccess("Cadastro realizado com sucesso!");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    }
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </center>
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
            <center>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              />
            </center>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center">{success}</p>}
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

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function verificarLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email !== "a@gmail.com" || password !== "nota10") {
      setError("Informações inexistentes ou faltando com o nosso regulamento.");
      return;
    }
    setError("");
    router.push("/logado");
  }

  return (
    <> 
      
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={verificarLogin} className="space-y-4">
          
          <p className="text-red-500 text-sm">{error}</p>
          <center><button type="submit" className="w-full py-2 bg-yellow-900 text-white text-lg font-medium rounded-lg hover:bg-yellow-600 transition duration-300">

            Criar Conta

          </button></center>
        </form>
        
      </div>
    </div>
    </>
  );
}






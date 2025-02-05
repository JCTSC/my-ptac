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
      <div>
      {/* Cabeçalho */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Restaurante Gourmet</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link">Início</Link>
              </li>
              <li className="nav-item">
                <Link href="/reservas" className="nav-link">Reservas</Link>
              </li>
              <li className="nav-item">
                <Link href="/perfil" className="nav-link">Ver Perfil</Link>
              </li>
              <li className="nav-item">
                <Link href="/cadastrar" className="nav-link">Cadastro Usuário</Link>
              </li>
              <li className="nav-item">
                <Link href="/mesa" className="nav-link">Cadastro Mesas</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Cadastro do Usuário */}
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card p-4 shadow-lg w-50">
          <h2 className="text-center mb-4">Cadastro</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                value={usuario.nome}
                onChange={(e) => alterarNome(e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={usuario.email}
                onChange={(e) => alterarEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                value={usuario.password}
                onChange={(e) => alterarPassword(e.target.value)}
                placeholder="Senha"
                required
              />
            </div>
            {msgError && <p className="text-danger text-center">{msgError}</p>}
            <div className="d-grid">
              <button type="submit" className="btn btn-warning text-white">Cadastrar</button>
            </div>
          </form>
          <p className="text-center mt-3">
            Já tem uma conta? <Link href="/login" className="text-warning fw-bold">Faça login</Link>
          </p>
        </div>
      </div>
      
      {/* Rodapé */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-1">&copy; 2024 Restaurante Gourmet - Todos os direitos reservados.</p>
          <p className="mb-1">Endereço: Rua Gastronômica, 123 - São Paulo, SP</p>
          <p className="mb-0">Contato: (11) 99999-9999 | contato@restaurantegourmet.com</p>
          <div className="mt-3">
            <a href="#" className="text-white me-3">Facebook</a>
            <a href="#" className="text-white me-3">Instagram</a>
            <a href="#" className="text-white">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

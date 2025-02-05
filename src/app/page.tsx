'use client';
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies"; // Biblioteca para lidar com cookies

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (!token) {
      router.push('/login')
    }
  }, [])


  return (
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
      
      {/* Conteúdo Principal */}
      <div className="container text-center mt-5">
        <div className="card p-4 shadow-lg">
          <h1 className="mb-4">Bem-vindo ao Restaurante Gourmet</h1>
          <p className="lead">Faça sua reserva e aproveite uma experiência gastronômica única.</p>
          
          <div className="d-grid gap-3 mt-4">
            <Link href="/reservas" className="btn btn-warning">Fazer Reserva</Link>
          </div>
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
  );
}

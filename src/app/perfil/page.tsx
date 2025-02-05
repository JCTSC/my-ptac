'use client'
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";
import Reserva from "../interface/reserva";
import Usuario from "../interface/usuario";
import { useRouter } from "next/navigation";
import ResponseSignin from "../interface/response";
import Link from 'next/link';

const PaginaPerfil = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [msgError, setMsgError] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const { 'restaurant-token': token } = parseCookies();

  useEffect(() => {
    const fetchPerfil = async () => {
      const response = await fetch(`${ApiURL}/perfil/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setNome(data.usuario.nome)
      setEmail(data.usuario.email)
      setTipo(data.usuario.tipo)
    };

    const fetchVerReservas = async () => {
      try {
        const response = await fetch(`${ApiURL}/reservas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.erro) {
          setReservas(data.reservas);
        } else {
          console.error(data.mensagem);
        }
      } catch (error) {
        console.error('Erro ao buscar reservas do usuário:', error);
      }
    };


    fetchPerfil();
    fetchVerReservas();
  }, [token]);

  const cancelarReserva = async (id) => {
    const reservationToCancel = { reservaId: id };

    try {
        const response = await fetch(`${ApiURL}/reservas`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(reservationToCancel),
        });

        const data = await response.json();
        if (!data.erro) {
            setReservas(reservas.filter(reserva => reserva.id !== id));
            console.log(`Reserva ${id} cancelada.`);
        } else {
            console.error(data.mensagem);
        }
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
    }
};


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
        
        {/* Perfil do Usuário */}
      <div className="container mt-5">
        <div className="card p-4 shadow-lg">
          <h1 className="text-center">Perfil do Usuário</h1>
          <p><strong>Nome:</strong> {nome}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Tipo:</strong> {tipo}</p>
          <hr />
          <h2 className="text-center">Minhas Reservas</h2>
          <div className="list-group">
            {reservas.length > 0 ? (
              reservas.map((reserva) => (
                <div key={reserva.id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm p-3">
                  <div>
                    <h5>Mesa {reserva.mesaId}</h5>
                    <p><strong>Número de Pessoas:</strong> {reserva.n_pessoas} pessoas</p>
                    <small><strong>Data:</strong> {new Date(reserva.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</small>
                  </div>
                  <button className="btn btn-danger" onClick={() => cancelarReserva(reserva.id)}>
                    Cancelar Reserva
                  </button>
                </div>
              ))
            ) : (
              <div className="list-group-item text-center text-muted">{msgError}</div>
            )}
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
};

export default PaginaPerfil;

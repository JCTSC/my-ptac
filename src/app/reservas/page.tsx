'use client';
import { ChangeEvent, useState, useEffect } from "react";
import { ApiURL } from "../config";
import MesasType from "../interface/mesa";
import ReservasType from "../interface/reserva";
import styles from "../page.module.css";
import { parseCookies } from "nookies";
import ResponseSignin from "../interface/response";
import Link from 'next/link';

export default function Reservas() {
    const [mesas, setMesas] = useState<MesasType[]>([]);
    const [reserva, setReserva] = useState<ReservasType>({
        usuario_id: 0,
        mesa_id: 0,
        data: new Date,
        n_pessoas: 0,
        status: false
    })

    const [dateTables, setDateTables] = useState(getDateNow());
    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
    const [msgError, setMsgError] = useState<string | null>(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${ApiURL}/mesa`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                setMesas(data.mesas);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    function getDateNow() {
        const today = new Date();
        return today.toISOString().split("T")[0];
    }
    function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
        setDateTables(e.target.value);
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { 'restaurant-token': token } = parseCookies();


        const response = await fetch(`${ApiURL}/reservas/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ...reserva, mesa_id: mesaSelecionada })
        });

        setReserva((reservaAnterior) => ({
            ...reservaAnterior,
            mesa_id: Number(mesaSelecionada)
        }));

        if (response) {
            const data: ResponseSignin = await response.json();
            const { erro, mensagem, token = '' } = data;
            console.log(data)
            if (erro) {
                setMsgError(mensagem);
            } else {
                console.log('Reserva cadastrada:', reserva);
            }
        } else {
            setMsgError("Resposta não respondida");
        }
    };

    const alterarData = (novaData: string) => {

        setReserva((reservaAnterior) => ({
            ...reservaAnterior,
            data: new Date(novaData)
        }));
    }

    const alterarNumPessoas = (numPessoas: string) => {
        setReserva((reservaAnterior) => ({
            ...reservaAnterior,
            n_pessoas: Number(numPessoas)
        }));
    }

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
        
        {/* Reservas */}
        <div className="container mt-5">
          <div className="card p-4 shadow-lg">
            <h1 className="text-center">Reservas de Mesas</h1>
            <div className="mb-3">
              <label className="form-label">Escolha uma data:</label>
              <input
                type="date"
                className="form-control"
                value={dateTables}
                min={getDateNow()}
                onChange={handleChangeDate}
              />
            </div>
            {mesaSelecionada !== null && (
              <div className="card p-3 shadow-sm">
                <h2>Reservar Mesa {mesaSelecionada}</h2>
                <p><strong>Código da mesa:</strong> {mesas[mesaSelecionada - 1].codigo}</p>
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="dateInput">Data da Reserva</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateInput"
                      value={reserva.data.toISOString().split("T")[0]}
                      onChange={(e) => alterarData(e.target.value)}
                      min={getDateNow()}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="numPessoasInput">Número de pessoas na mesa</label>
                    <input
                      type="number"
                      className="form-control"
                      id="numPessoasInput"
                      value={reserva.n_pessoas}
                      onChange={(e) => alterarNumPessoas(e.target.value)}
                      min={1}
                      max={mesas[mesaSelecionada - 1].n_lugares}
                    />
                  </div>
                  {msgError && <div className="alert alert-danger">{msgError}</div>}
                  <button type="submit" className="btn btn-success w-100">Reservar Mesa</button>
                </form>
              </div>
            )}
            {mesaSelecionada === null && <p className="text-center">Selecione uma mesa para reservar</p>}
          </div>
          <div className="row mt-4">
            {mesas.map(table => (
              <div className="col-md-4 text-center" key={table.id}>
                <div className="card p-3 shadow-sm" onClick={() => setMesaSelecionada(Number(table.id))}>
                  <img src="IMAGEM DE UMA CADEIRA" alt={`Mesa ${table.id}`} className="img-fluid rounded mb-2" />
                  <h4>Mesa 0{table.id} - {table.n_lugares} cadeiras</h4>
                  <p className="text-success">Disponível</p>
                </div>
              </div>
            ))}
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
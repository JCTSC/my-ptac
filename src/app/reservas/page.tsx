'use client';
import { ChangeEvent, useState, useEffect } from "react";
import { ApiURL } from "../config";
import MesasType from "../interface/mesa";
import ReservasType from "../interface/reserva";
import styles from "../page.module.css";
import { parseCookies } from "nookies";
import ResponseSignin from "../interface/response";

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
        <h1>Reservas de Mesas</h1>
        <div>
            <div>
                <input
                    type="date"
                    value={dateTables}
                    min={getDateNow()}
                    onChange={handleChangeDate}
                />
                <div>
                    {mesaSelecionada !== null && (
                        <div>
                            <h2>Reservar Mesa {mesaSelecionada}</h2>
                            <p>Código da mesa: {mesas[mesaSelecionada - 1].codigo}</p>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="dateInput">Data da Reserva</label>
                                    <input
                                        type="date"
                                        id="dateInput"
                                        value={reserva.data.toISOString().split("T")[0]}
                                        onChange={(e) => alterarData(e.target.value)}
                                        min={getDateNow()}
                                    />
                                    <div>Coloque a data que irá reservar a mesa</div>
                                </div>
                                <div>
                                    <label htmlFor="numPessoasInput">Número de pessoas na mesa</label>
                                    <input
                                        type="number"
                                        id="numPessoasInput"
                                        value={reserva.n_pessoas}
                                        onChange={(e) => alterarNumPessoas(e.target.value)}
                                        min={1}
                                        max={mesas[mesaSelecionada - 1].n_lugares}
                                    />
                                    <div>Coloque o número de pessoas que irão reservar a mesa ({mesas[mesaSelecionada - 1].n_lugares})</div>
                                </div>
                                {msgError && (
                                    <div>
                                        <p>{msgError}</p>
                                    </div>
                                )}
                                <button type="submit">Reservar Mesa</button>
                            </form>
                        </div>
                    )}
                    {mesaSelecionada === null && <p>Selecione uma mesa para reservar</p>}
                </div>
            </div>
            <div>
                <div>
                    {mesas.map(table => (
                        <div
                            onClick={() => setMesaSelecionada(Number(table.id))}
                            key={table.id}
                            style={{ width: "200px", margin: "10px" }}
                        >
                            <img
                                src="IMAGEM DE UMA CADEIRA"
                                alt={`Mesa ${table.id}`}
                                style={{ width: "100%", borderRadius: "5px" }}
                            />
                            <h4>Mesa 0{table.id} - {table.n_lugares} cadeiras</h4>
                            <p>Disponível</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}
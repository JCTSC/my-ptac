'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiURL } from "../config";
import { parseCookies, setCookie } from "nookies";
import ResponseSignin from "../interface/response";
import MesasType from "../interface/mesa";

export default function Mesa() {
    const [mesa, setMesa] = useState<MesasType>({
        codigo: '',
        n_lugares: 0,
    });
    const [msgError, setMsgError] = useState<string | null>(null);
    const router = useRouter();



    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { 'restaurant-token': token } = parseCookies();

        const response = await fetch(`${ApiURL}/mesa/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(mesa)
        })
        if (response) {
            const data: ResponseSignin = await response.json()
            const { erro, mensagem } = data;
            console.log(data)
            if (erro) {
                setMsgError(mensagem)
            }

            // Aqui você pode adicionar lógica para enviar os dados para o seu backend
            console.log('Mesa cadastrada:', mesa);
            router.push("/reservas")
        }
    }

    const alterarCodigo = (novoCodigo: string) => {

        setMesa((mesaAnterior) => ({
            ...mesaAnterior,
            codigo: novoCodigo
        }));
    }

    const alterarLugares = (novoLugares: string) => {
        setMesa((mesaAnterior) => ({
            ...mesaAnterior,
            n_lugares: Number(novoLugares)
        }));
    }



    return (
    <div>
        <h2>Cadastrar Mesa</h2>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="codigo">Código da Mesa</label>
                <input
                    type="text"
                    id="codigo"
                    value={mesa.codigo}
                    onChange={(e) => alterarCodigo(e.target.value)}
                    required
                    min={6}
                />
            </div>

            <div>
                <label htmlFor="lugares">Número de Lugares (Cadeiras)</label>
                <input
                    type="number"
                    id="lugares"
                    value={mesa.n_lugares}
                    onChange={(e) => alterarLugares(e.target.value)}
                    required
                    min={1}
                />
            </div>

            {msgError && (
                <div>
                    <p>{msgError}</p>
                </div>
            )}

            <div>
                <button type="submit">Cadastrar Mesa</button>
            </div>
        </form>
    </div>
    );
}
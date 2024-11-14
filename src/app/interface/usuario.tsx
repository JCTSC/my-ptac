
interface Usuario {
    id?: number;
    nome: string;
    password: string;
    email: string;
    idade: number;
    tipo?: "cliente" | "adm";
 
}

export default Usuario;

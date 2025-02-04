interface Usuario {
    id?: number;
    nome: string;
    password: string;
    email: string;
    tipo?: "cliente" | "adm";
}

export default Usuario;
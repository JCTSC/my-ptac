type MyInputProp = {
    valor: string;
    funcao : () => void
}

const MyInput: React.FC<MyInputProp> = ({valor, funcao}) => {

    return(
        <input value={valor} onChange={funcao}/> 
    )

} 

/* 

export default function Cadastro() {


}




const alterarNome = {novoNome : string } => {
console.log{usuario}
setUsuario((usuarioAnterior) => ({
...usuarioAnterior,
nome: novoNome
    }))
} 

const router = useRouter();
    */
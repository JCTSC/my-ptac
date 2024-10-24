'use client'
import styles from "../page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Davi Kazan",
      email: "davirevoltado@gmail.com",
      senha: "senha123",
      tipo: "adm"
    },
    {
      id: 2,
      nome: "Ghost Arashi",
      email: "ghostaashi@gmail.com",
      senha: "senha123",
      tipo: "cliente"
    }
  ])

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const usuario = usuarios.find((user) => user.email == email && user.password == senha)
    if(usuario){
      localStorage.setItem('usuario', JSON.stringify(usuario))
      router.push('/home')
    } else {
      setError('Email ou senha inválido!')
    }
  }

  function verificarLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email !== 'ptac4' || senha !== 'nota10') {
      setError('E-mail ou senha inválidos');
      return;
    }

    setError('');
    router.push('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h2>Login</h2>
        <form onSubmit={verificarLogin}>

          <input type="text" 
           onChange={(e) => setEmail(e.target.value)}
           placeholder="Email" required className={styles.input}/>
          <input type="password" 
           onChange={(e) => setSenha(e.target.value)}
           placeholder="Senha" required className={styles.input}/>

          <p style={{color: "red"}}>{error}</p>
          <button type="submit" className={styles.link}>Login</button> 

        <Link href="/cadastrar">
        <p className="text-"> Me cadastrar </p>
        </Link>
        </form>
      </div>
    </div>
  );
}
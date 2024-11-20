'use client';
import styles from "../page.module.css";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ApiURL } from "../config";
import { setCookie } from 'nookies';

interface ResponseSignin {
  erro: boolean;
  mensagem: string;
  token?: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log

      if (response) {
        const data: ResponseSignin = await response.json();
        const { erro, mensagem, token = '' } = data;

        if (erro) {
          setError(mensagem);
        } else {
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60 * 60, 
          });
          router.push('/'); 
        }
      } else {
        setError('Erro durante login. Suas informações não estão presentes.');
      }

    } catch (error) {
      console.error('Request error:', error);
      setError('Um erro inesperado ocorreu. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <center><h1>Login</h1></center>
      <form onSubmit={handleSubmit}>
        <center>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </center>
        <center>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </center>
        {error && <p className={styles.error}>{error}</p>}
        <center>
          <button type="submit" className={styles.button}>Login</button>
        </center>
      </form>
      <center>
        <Link href="/cadastrar">Se não tem uma conta, registre-se</Link>
      </center>
    </div>
  );
}

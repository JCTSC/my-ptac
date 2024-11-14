
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

  const handleSubmit = async (e: FormEvent) => {
    
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
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
      setError('Um erro inexperado ocorreu');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <Link href="/cadastrar">Se não tem uma conta, registre-se</Link>
    </div>
  );
}

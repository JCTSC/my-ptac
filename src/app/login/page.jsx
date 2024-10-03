'use client'
import styles from "../page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function verificarLogin(e) {
    e.preventDefault();
    if (email !== 'ptac4' || password !== 'nota10') {
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
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Senha" required className={styles.input}/>

          <p style={{color: "red"}}>{error}</p>
          <button type="submit" className={styles.link}>Login</button> 
        </form>
      </div>
    </div>
  );
}
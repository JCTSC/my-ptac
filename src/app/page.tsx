'use client';
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies"; // Biblioteca para lidar com cookies

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica a presença do token no cookie
    const cookies = parseCookies();
    if (cookies["restaurant-token"]) {
      setIsAuthenticated(true);
    } else {
      router.push("/login"); // Redireciona para a tela de login
    }
  }, [router]);

  // Função para realizar o logout
  const handleLogout = () => {
    destroyCookie(null, "restaurant-token"); // Remove o cookie
    setIsAuthenticated(false);
    router.push("/login"); // Redireciona para a tela de login
  };

  return (
    <center>
      <div className={styles.main}>
        <h1>Bem-vindo ao site</h1>
        <h2>{isAuthenticated ? "Você está autenticado" : "Necessário Login"}</h2>
        {isAuthenticated ? (
          <>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href={"/login"} className={styles.link}>
              Sign In
            </Link>
          </>
        )}
        <p style={{ fontSize: "12px" }}>Duo: Bruno Cristo / Júlio César</p>
      </div>
    </center>
  );
}

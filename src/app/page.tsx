'use client';
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies"; // Biblioteca para lidar com cookies

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (!token) {
      router.push('/login')
    }
  }, [])


  return (
    <center>
      <div className={styles.main}>
        <h1>Bem-vindo ao site</h1>

        <Link href={'/cadastrar'}>Página Cadastrar Usuario</Link>
        <Link href={'/perfil'}>Página Perfil</Link>
        <Link href={'/reservas'}>Página Cadastrar Reserva</Link>
        <Link href={'/mesa'}>Página Cadastrar Mesa</Link>

        <p style={{ fontSize: "12px" }}>Duo: Bruno Cristo / Júlio César</p>
      </div>
    </center>
  );
}

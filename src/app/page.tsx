"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter
  const [user, setUser] = useState(true);
  if (user){
    return (
      <div className={styles.page}>

      <h1> KURONAMI NO YAIBA SANNN </h1>
      <button onClick ={() => setUser(false)}>ol</button>

      

      </div>
    );

  } else {
    return (
      <h1>SAQUEADORA</h1>
    )
  }
  
}

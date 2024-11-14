import styles from "./page.module.css"
import Link from "next/link";


export default function Home() {
  return (
    <div className={styles.main}>
        <h1 >Entrada Necessária</h1>
        <p>O site necessita de identificação para acessar.</p>
        <Link href={"/login"} className={styles.link}>Sign In</Link>
        <p style={{fontSize: "12px"}}>Duo: Bruno Cristo / Júlio César</p>
    </div>

  );
}
import styles from "./page.module.css"
import Link from "next/link";
import 

export default function Home() {
  return (
    <div className={styles.main}>
        <center><h1>Entrada Necessária</h1></center>
        <center><p>O site necessita de identificação para acessar.</p></center>
        <center><Link href={"/login"} className={styles.link}>Sign In</Link></center>
        <p style={{fontSize: "12px"}}>Duo: Bruno Cristo / Júlio César</p>
    </div>

  );
}


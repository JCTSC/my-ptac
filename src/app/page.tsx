import styles from "./page.module.css"
import Link from "next/link";


export default function Home() {
  return (
    
    <center><div className={styles.main}>
       <h1 >Entrada Necessária</h1>
        <h2>O site necessita de identificação para acessar.</h2>
        <p></p>
        <p></p>
   
        <Link type="submit" href={"/login"} className={styles.link}>Sign In</Link>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        
        
        <p style={{fontSize: "12px"}}>Duo: Bruno Cristo / Júlio César</p>
        
    </div></center>

  );
}
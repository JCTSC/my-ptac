'use client'
import styles from "../page.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from "../interface/usuario";
import Link from "next/link";
import { ApiUrl } from "../config"



  export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string>('');














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






  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${ApiURL}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type' : ' application/json'
      },
      body: JSON.stringify({email, password})
    })











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

}
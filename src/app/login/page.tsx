'use client'
import styles from "../page.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from "../interface/usuario";
import Link from "next/link";
import { ApiURL } from "../config"

  export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  interface ResponseSignin {
    erro: boolean,
    mensagem: string,
    token?: string
  }
  
      const handleSubmit = async (e : FormEvent) => {
        e.preventDefault();
        try {
         const response = await fetch(`${ApiURL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({email, password})
         })
          if (response){
            const data : ResponseSignin = await response.json()
            const {erro, mensagem, token = ''} = data;
            console.log(data)
            if (erro){
              setError(mensagem)
            } else {
              // npm i nookies setCookie
              setCookie(undefined, 'restaurant-token', token, {
                maxAge: 60*60*1 // 1 hora
              } )
  
            }
          } else {
  
          }
      } 
       catch (error) {
      console.error('Erro na requisicao', error)
    }
  

const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const usuario = usuarios.find((user) => user.email == email && user.password == password)
    if(usuario){
      localStorage.setItem('usuario', JSON.stringify(usuario))
      router.push('/home')
    } else {
      setError('Email ou password inválido!')
    }
  }


  function verificarLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email !== 'ptac4' || password !== 'nota10') {
      setError('E-mail ou password inválidos');
      return;
    }


    setError('');
    router.push('/')
  }

}
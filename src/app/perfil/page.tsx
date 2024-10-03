'use client'

import PerfilUsuario from "../interface/perfilUsuario";


const PaginaPerfil = () =>{
    const usuario = {
        nome : 'asdf',
        idade : '10',
        email : 'a@gmail.com'
    }

    return (
        <div>
          <h1>Página Perfil</h1>
          <PerfilUsuario usuario={usuario} />
        </div>
      );
}

export default PaginaPerfil
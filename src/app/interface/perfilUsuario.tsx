import React from 'react'
import Usuario from './usuario'

const PerfilUsuario: React.FC<{usuario: Usuario}> = ({usuario}) => {
    return(
        <div>
                <h1>{usuario.nome}</h1>
                <p>{usuario.idade}</p>
                { usuario.email? <p>{usuario.email}</p>  : <p>Sem email disponível</p>} 
        </div>
    );
};

export default PerfilUsuario;
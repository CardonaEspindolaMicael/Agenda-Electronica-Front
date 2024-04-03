import React from 'react'
import "./header.css"
const Header = () => {
  const currentDate= new Date();
  return (
    <header>
      <label className="label-header titulo_fecha" htmlFor="">Fecha: {`${currentDate.getDate()}/ ${currentDate.getMonth()+1}/${currentDate.getFullYear()}`}</label>
      <label className="label-header cargo_rol" htmlFor="">Usuario: {sessionStorage.getItem('idNombre')}</label>
    </header>
  )
}

export default Header
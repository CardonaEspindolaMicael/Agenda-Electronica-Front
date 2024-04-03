import React from 'react'
import { Link } from "react-router-dom";
import './notFound.css'
export const NotFound = () => {
  return (
    <div className="errorNotFound">
      <div className="errorNotFound__404">
        <h1>
          404
        </h1>
        <h2>
         {window.location.href} <br/>NO EXISTE
        </h2>
        <p>
          <Link to="/dashboard">Pulse aqui para regresar</Link>
        </p>
      </div>

    </div>
  )
}

export default NotFound
import React, { useEffect, useState } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik"
import axios from "axios"
import logo from '/logo.png'

export const Login = () => {
 


  const signIn = useSignIn();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/auth/login",
        values
      );
      const datos=response.data
      console.log(datos.data.cargo)
      if(datos.data.cargo!=='administrador'){
        alert('Lo siento no tienes los permisos para acceder')
        return;
      }
      alert(datos.message[0])
      signIn({
        auth: {
          token: datos.data.sessionToken,
          type: 'Bearer',
        },
      });
      sessionStorage.setItem('ci_usuario', datos.data.ci)
   
      sessionStorage.setItem('cargo', datos.data.cargo)
  
      const nombre = (datos.data.nombre).split(" ")
      if(nombre[1]){
        sessionStorage.setItem('idNombre', nombre[0] + ' ' + nombre[1])
      }else{
        sessionStorage.setItem('idNombre', nombre)
      }
  
     
      window.location.href = "/usuarios";

    } catch (error) {

      alert(error.response.data.message)
      return error
    }
  };

  const formik = useFormik({
    initialValues: {
      ci: "",
      contrasena: "",
    },
    onSubmit,
  });



  return (
<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
  <form style={{ width: '400px' }} className="row p- grid gap-3">
      <img className="mb-4" src={logo} />
      <div className="form-floating">
        <input id="floatingInput" className="form-control " type='text' placeholder='User' maxLength={100} minLength={3} {...formik.getFieldProps('ci')} />
        <label htmlFor="floatingInput">USUARIO</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder='Password' maxLength={256} minLength={3} {...formik.getFieldProps('contrasena')} />
        <label htmlFor="floatingPassword">CONTRASEÑA</label>
      </div>
      <button className="mt-3 btn btn-primary" type="submit" onClick={formik.handleSubmit}>LOGIN</button>
    </form>
    </div>
  )
}

export default Login
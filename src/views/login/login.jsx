import React, { useEffect, useState } from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik"
import axios from "axios"
import logo from '/logo.png'

export const Login = () => {
 


  const signIn = useSignIn();
  const [showResponse, setResponse] = useState();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/auth/login",
        values
      );
      console.log(response.data)
      setResponse(response)
      signIn({
        auth: {
          token: response.data.token,
          type: 'Bearer',
        },
      });
      sessionStorage.setItem('ci_usuario', response.data.data.ci)
      
      sessionStorage.setItem('cargo', response.data.data.cargo)
  
      const nombre = (response.data.data.nombre).split(" ")
      console.log(nombre[1])
      if(nombre[1]){
        sessionStorage.setItem('idNombre', nombre[0] + ' ' + nombre[1])
      }else{
        sessionStorage.setItem('idNombre', nombre)
      }
  
     
      window.location.href = "/dashboard";
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
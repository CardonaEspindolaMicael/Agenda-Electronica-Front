import React from 'react'
import {  useNavigate } from 'react-router-dom'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Dropdown from '../DROPDOWN/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sidebar.css"
import teacher from '/teacher.svg'
import logo from '/logo.png'
import parent from '/parents.svg'
import student from '/student.svg'
import edit from '/editar.svg'
import announcement from '/release.svg'
import log_out from '/log_out.svg'
import automatic from '/auto.svg'
/*ICONOS*/






const Sidebar = () => {
  const role = sessionStorage.getItem('rolUsuario');/*----*/
  const signOut = useSignOut();
  const navigate = useNavigate();

  const padres = [
    { icon: automatic, path: '#', text: 'Auto Insertar' },
    { icon: edit, path: '#', text: 'Editar Tutor' }
  ];
  const estudiante = [

    { icon: automatic, path: '#', text: 'Auto Insertar' },
    { icon: edit, path: '#', text: 'Editar Usuarios' },
  ];
  const historiasClinicas = [
    { icon: "", path: '/historias', text: 'Historiales' },
    { icon: "", path: '#', text: 'Planes de T.' },
    { icon: "", path: '#', text: 'Procedimientos' },
  ];
  const pagos = [
    { icon: "", path: '#', text: 'Registrar Pago' },
    { icon: "", path: '#', text: 'Recibos' },
  ];
  const consultas = [
    { icon: "", path: '/consulta', text: 'Consultas' },
    { icon: "", path: '#', text: 'Proforma' },
  ];
  const servicios = [
    { icon:"", path: '/servicio', text: 'Servicios' },
    { icon: "", path: '/Tratamientos', text: 'Tratamientos' },
  ];
  const usuarios = [
    { icon: "", path: '/usuarios', text: 'Usuarios' },
    { icon: "", path: '#', text: 'Contraceñas' },
  ];
  const miCuenta = [
    { icon: "", path: '/miCuenta', text: 'Mi Cuenta' },
  ];

  const logout = () => {
    signOut();
    sessionStorage.removeItem('idUsuario')
    sessionStorage.removeItem('rolUsuario')
    sessionStorage.removeItem('idNombre')
    navigate("/")

  }
  return (
    <aside className='Sidebar'>
      <div className="container__sidebar">
        <div className='datos__user'>
          <img src={logo} alt="logo_clinica" />
        </div>
        <nav >
          <ul className='barra__navegacion'>
            <h5>MENU</h5>

            {role == 'DOCTOR' && (
              <li>
                <Dropdown title="Tutores" links={padres} icon={parent}/>
              </li>
            )}
            {role == 'DOCTOR' && (
              <li>
                <Dropdown title="Usuarios" links={estudiante} icon={student} />
              </li>
            )}

            {role == 'ADMIN' && (
              <li>
                <Dropdown title="Servicios" links={servicios} icon={""} />
              </li>
            )}
            {role == 'ADMIN' && (
              <li>
                <Dropdown title="Herramientas" links={herramientas} icon={""} />
              </li>
            )}
            {role == 'ADMIN' && (
              <li>
                <Dropdown title="Usuarios" links={usuarios} icon={""} />
              </li>
            )}

          </ul>
        </nav>
        <div className='usuarioNombre'>
          <div className='usuarioNombre__botton'>
            <img src={log_out} />
            <a className='barra__navegacionRutasAb' onClick={logout}>Cerrar Sesion</a>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

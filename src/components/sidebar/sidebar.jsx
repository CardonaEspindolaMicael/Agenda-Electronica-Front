import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Dropdown from '../DROPDOWN/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sidebar.css"
import logo from '/logo.png'
import parent from '/parents.svg'
import student from '/student.svg'
import edit from '/editar.svg'
import announcement from '/release.svg'
import log_out from '/log_out.svg'
import automatic from '/auto.svg'
import teacher from '/teacher.svg'
import visto from '/seem.svg'
/*ICONOS*/






const Sidebar = () => {
  const role = sessionStorage.getItem('cargo');/*----*/
  const signOut = useSignOut();
  const navigate = useNavigate();

  const padres = [
    { icon: automatic, path: '/tutores', text: 'Auto Insertar' },
    { icon: edit, path: '#', text: 'Editar Tutor' }
  ];
  const estudiante = [

    { icon: automatic, path: '/usuarios', text: 'Auto Insertar' },
    { icon: edit, path: '#', text: 'Editar Usuarios' },
  ];
  const comunicados = [

    { icon: visto, path: 'vistosComunicado', text: 'Vistos' },
  ];
  const profesores = [

    { icon: automatic, path: '/profesores', text: 'Auto Insertar' },
  ];


  const logout = () => {
    signOut();
    sessionStorage.removeItem('ci_usuario')
    sessionStorage.removeItem('cargo')
    sessionStorage.removeItem('idNombre')
    navigate("/login")

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

            {role == 'administrador' && (
              <li>
                <Dropdown title="Estudiantes" links={estudiante} icon={student} />
              </li>
            )}
            {role == 'administrador' && (

              <li>
                <Dropdown title="Tutores" links={padres} icon={parent} />
              </li>
            )}
            {role == 'administrador' && (
              <li>
                <Dropdown title="Profesores" links={profesores} icon={teacher} />
              </li>
            )}
            {role == 'administrador' && (
              <li>
                <Dropdown title="Comunicado" links={comunicados} icon={announcement} />
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

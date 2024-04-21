import { BrowserRouter, Route, Routes } from "react-router-dom"
import './app.css'
import Dashboard from "./views/DASHBOARD/dashboard"
import NotFound from "./components/NOTFOUND/notFound"
import AuthProvider from "react-auth-kit/AuthProvider"
import createStore from "react-auth-kit/createStore"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Usuarios from "./views/USUARIOS/Usuarios"
import NuevoUsuario from "./views/USUARIOS/NuevoUsuario"
import RestablecerContraceña from "./views/USUARIOS/RestablecerContraseña"
import Login from "./views/login/login"
import Comunicado from "./views/comicado/comunicado"

import RestablecerContraseñaTutor from "./views/tutores/RestablecerContraseñaTutor"
import NuevoUsuarioTutor from "./views/tutores/NuevoUsuarioTutor"
import Profesor from "./views/profesores/Profesor"
import Tutores from "./views/tutores/Tutores"
import VistosComunicado from "./views/vistos/VistosComunicado"
import NuevoProfesor from "./views/profesores/NuevoProfesor"




const role = sessionStorage.getItem('rolUsuario');/*----*/

const store = createStore({
  authName: '_auth',
  authType: 'localstorage',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',

});
function App() {

  return <>


    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path="/" element={<Dashboard />}>
              
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="nuevoUsuario" element={<NuevoUsuario />} />
              <Route path="nuevoUsuarioProfesor" element={<NuevoProfesor />} />
              <Route path="restablecerContraseña" element={<RestablecerContraceña />} />
              <Route path="comunicado" element={<Comunicado/>}/>
              <Route path="vistosComunicado" element={<VistosComunicado/>}/>
             <Route path="tutores" element={<Tutores/>}/>
             <Route path="restablecerContraseñaTutor" element={<RestablecerContraseñaTutor/>}/>
             <Route path="NuevoUsuarioTutor" element={<NuevoUsuarioTutor/>}/>
             <Route path="profesores" element={<Profesor/>}/>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </AuthProvider>

  </>
}

export default App

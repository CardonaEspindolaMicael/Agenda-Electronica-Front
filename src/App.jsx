import { BrowserRouter, Route, Routes } from "react-router-dom"
import './app.css'
import Dashboard from "./views/DASHBOARD/dashboard"
import NotFound from "./components/NOTFOUND/notFound"
import AuthProvider from "react-auth-kit/AuthProvider"
import createStore from "react-auth-kit/createStore"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'



import Paciente from "./views/PACIENTES/Paciente"
import NuevoPaciente from "./views/PACIENTES/NuevoPaciente"
import ActualizarPaciente from "./views/PACIENTES/ActualizarPaciente"
import MiCuenta from "./views/MI_CUENTA/Cuenta"
import CambiarPass from "./views/MI_CUENTA/CambiarPass"
import Usuarios from "./views/USUARIOS/Usuarios"
import NuevoUsuario from "./views/USUARIOS/NuevoUsuario"
import RestablecerContraceña from "./views/USUARIOS/RestablecerContraseña"
import Login from "./views/login/login"
import Comunicado from "./views/comicado/comunicado"




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
              <Route index element={<Usuarios />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="nuevoUsuario" element={<NuevoUsuario />} />
              <Route path="restablecerContraseña" element={<RestablecerContraceña />} />
              <Route path="comunicado" element={<Comunicado/>}/>
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
